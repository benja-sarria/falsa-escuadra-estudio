import {
    PhotoDataInterface,
    PhotoQueryParamsType,
    PhotosObjectInterface,
    ProjectDataInterface,
    ProjectQueryParamsType,
    UpdateOrDeletePhotoInterface,
    UpdateOrDeleteProjectInterface,
    UpdatePhotoDataInterface,
} from "@/types/projectTypes";

import { NewProjectDTO } from "@/models/dtos/NewProject.dto";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { StandardAPIError } from "@/utils/api/standarizedErrors";
import { StandardSuccessResponse } from "@/utils/api/standarizedSuccessResponse";
import { NewPhotoDTO } from "@/models/dtos/NewPhoto.dto";
//@ts-ignore
import { uniqueSlug } from "unique-slug";
import slugify from "slugify";
import fs from "fs";
import { removePriorImg, saveToWebp } from "@/utils/img/saveToWebp";
import { Prisma } from "@prisma/client";

export class ProjectServices {
    projectDao: ProjectPrismaDao;
    constructor(projectDao: ProjectPrismaDao) {
        this.projectDao = projectDao;
    }

    async createProjectService(data: ProjectDataInterface) {
        try {
            const { photos, title } = data;
            let savedPhotos;
            if (photos.length > 0) {
                const folderPath = `${process.cwd()}/static/products/${slugify(
                    title,
                    { strict: true, lower: true }
                )}`;
                fs.mkdirSync(`${folderPath}`);
                savedPhotos = photos.map(
                    (image: PhotosObjectInterface, index: number) => {
                        // return saveToWebp(image, index, folderPath);
                    }
                );
            }
            if (savedPhotos) {
                await Promise.all([...savedPhotos]).then(
                    async (values: any) => {
                        const parsedData = new NewProjectDTO(data);
                        const savedProject =
                            await this.projectDao.createProject({
                                data: parsedData,
                                photos: values,
                            });
                        const standardResponse = new StandardSuccessResponse({
                            data: savedProject,
                        });
                        return { ...standardResponse };
                    }
                );
            } else {
                const parsedData = new NewProjectDTO(data);

                const savedProject = await this.projectDao.createProject({
                    data: parsedData,
                });
                const standardResponse = new StandardSuccessResponse({
                    data: savedProject,
                });
                return { ...standardResponse };
            }
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async getProjectService(queryParams: Prisma.ProductWhereInput | undefined) {
        try {
            const projects = await this.projectDao.getProjects(queryParams);
            const response = new StandardSuccessResponse({ data: projects });
            return { ...response };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async updateProjectService(data: UpdateOrDeleteProjectInterface) {
        try {
            const { id, ...updatedProperties } = data;
            const parsedData = new NewProjectDTO(updatedProperties);

            const updatedArea = await this.projectDao.updateProject(
                parsedData,
                id
            );
            const standardResponse = new StandardSuccessResponse({
                data: updatedArea,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async removeProjectService(data: UpdateOrDeleteProjectInterface) {
        try {
            const { id, ...updatedProperties } = data;

            const removedData = await this.projectDao.removeProject(id);
            const standardResponse = new StandardSuccessResponse({
                data: removedData,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async createPhotoService(data: PhotoDataInterface) {
        try {
            const parsedData = new NewPhotoDTO(data);

            const savedPhoto = await this.projectDao.createPhoto(parsedData);

            const standardResponse = new StandardSuccessResponse({
                data: savedPhoto,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async updatePhotoService(data: UpdatePhotoDataInterface) {
        try {
            if (!data) {
                throw new Error("Unsufficient data");
            }
            const folderPath = `${process.cwd()}/static/products/${
                data.postSlug
            }`;
            if (!fs.existsSync(folderPath)) {
                throw new Error("Unsufficient data");
            }
            removePriorImg(folderPath, `${data.id}`);

            const savedData = await saveToWebp(data.src, data.id, folderPath);
            if (savedData.error) {
                console.log("ERROR", savedData);

                throw new Error("Unsufficient data");
            }
            data.src.data = `${savedData.baseSrc}`;
            const savedPhoto = await this.projectDao.updatePhoto(data);

            const standardResponse = new StandardSuccessResponse({
                data: savedPhoto,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async getPhotoService(queryParams: PhotoQueryParamsType | undefined) {
        try {
            const photos = await this.projectDao.getPhotos(queryParams);

            const standardResponse = new StandardSuccessResponse({
                data: photos,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }

    async removePhotoService(data: UpdateOrDeletePhotoInterface) {
        try {
            const { id, ...updatedProperties } = data;

            const removedData = await this.projectDao.removePhoto(id);

            const standardResponse = new StandardSuccessResponse({
                data: removedData,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }
}
