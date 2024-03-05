import prisma from "../../db/singleton";

import { Prisma, PrismaClient, Product, ProductPhotos } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { NewProjectDTO } from "../dtos/NewProject.dto";
import {
    PhotoQueryParamsType,
    PhotosObjectInterface,
    ProductReceivedType,
    ProjectQueryParamsType,
    UpdatePhotoDataInterface,
} from "@/types/projectTypes";
import { NewPhotoDTO } from "../dtos/NewPhoto.dto";
import { ParsedProjectDTO } from "../dtos/ParsedProject.dto";

export class ProjectPrismaDao {
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

    //@ts-ignore
    static #dbInstances: DatabaseInstancesInterface = {};
    constructor() {
        this.db = prisma;
    }

    async createProject({
        data,
        photos,
    }: {
        data: NewProjectDTO;
        photos?: PhotosObjectInterface[];
    }) {
        const savedProject: Product = await this.db.product.create({
            data: {
                ...data,
            },
        });
        if (!savedProject) {
            throw new Error("There was a problem saving your data");
        }
        if (photos) {
            photos.forEach(async (photo: PhotosObjectInterface) => {
                const parsedData = new NewPhotoDTO({
                    alt: photo.alt,
                    isPortrait: photo.isPortrait,
                    src: photo.baseSrc,
                });
                const savedPhoto = await this.db.productPhotos.create({
                    data: {
                        ...parsedData,
                    },
                });
            });
        }
        return savedProject;
    }

    async getProjects(queryParams: Prisma.ProductWhereInput | undefined) {
        try {
            console.log("DAO", queryParams);

            const projects: ProductReceivedType[] =
                await this.db.product.findMany({
                    where: queryParams ? { ...queryParams } : {},
                    include: { photos: true, productType: true },
                });
            if (!projects) {
                return {
                    error: false,
                    message: "No projects found",
                    success: false,
                };
            }
            const parsedProjects = projects.map((project: any) => {
                const photos = (project as ProductReceivedType).photos.map(
                    (photo) => {
                        return {
                            ...photo,
                            createdAt: new Date(photo.createdAt)
                                .toLocaleDateString("en-GB")
                                .toString(),
                            updatedAt: new Date(photo.updatedAt)
                                .toLocaleDateString("en-GB")
                                .toString(),
                        };
                    }
                );
                project.photos = photos;
                const parsed = new ParsedProjectDTO(project);
                return parsed.parsed;
            });
            return parsedProjects;
        } catch (error: any) {
            return { error: true, success: false, message: error.message };
        }
    }

    async updateProject(parsedData: NewProjectDTO, id: number) {
        const updatedProject: Product = await this.db.product.update({
            data: {
                ...parsedData,
            },
            where: {
                id: id,
            },
        });
        if (!updatedProject) {
            throw new Error("There was a problem updating your data");
        }
        return updatedProject;
    }

    async removeProject(id: number) {
        const removedData = await this.db.product.delete({
            where: {
                id: id,
            },
        });
        if (!removedData) {
            throw new Error("There was a problem deleting your data");
        }
        return removedData;
    }
    async createPhoto(photoData: NewPhotoDTO) {
        const savedPhoto: ProductPhotos = await this.db.productPhotos.create({
            data: {
                ...photoData,
            },
        });
        if (!savedPhoto) {
            throw new Error("There was a problem saving your data");
        }
        return savedPhoto;
    }

    async updatePhoto(photoData: UpdatePhotoDataInterface) {
        const savedPhoto: ProductPhotos = await this.db.productPhotos.update({
            where: { id: photoData.id },
            data: {
                src: photoData.src.data,
            },
        });
        if (!savedPhoto) {
            throw new Error("There was a problem saving your data");
        }
        return savedPhoto;
    }

    async getPhotos(queryParams: PhotoQueryParamsType | undefined) {
        console.log("DAO", queryParams);

        const photos: ProductPhotos[] = await this.db.productPhotos.findMany({
            where: queryParams ? { ...queryParams } : {},
        });
        if (!photos) {
            throw new Error("There was a problem querying your data");
        }

        return photos;
    }

    async removePhoto(id: number) {
        const removedData = await this.db.productPhotos.update({
            where: {
                id: id,
            },
            data: {
                src: null,
                updatedAt: new Date(),
            },
        });
        if (!removedData) {
            throw new Error("There was a problem deleting your data");
        }
        return removedData;
    }

    async removePhotoAbsolute(id: number) {
        const removedData = await this.db.productPhotos.delete({
            where: {
                id: id,
            },
        });
        if (!removedData) {
            throw new Error("There was a problem deleting your data");
        }
        return removedData;
    }
}
