import prisma from "../../db/singleton";

import { Prisma, PrismaClient, Product, ProductPhotos } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { NewProjectDTO } from "../dtos/NewProject.dto";
import {
    PhotoQueryParamsType,
    PhotosObjectInterface,
    ProjectQueryParamsType,
} from "@/types/projectTypes";
import { NewPhotoDTO } from "../dtos/NewPhoto.dto";

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
                    productId: savedProject.id,
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

    async getProjects(queryParams: ProjectQueryParamsType | undefined) {
        console.log("DAO", queryParams);

        const projects: Product[] = await this.db.product.findMany({
            where: queryParams ? { ...queryParams } : {},
            include: { photos: true, productType: true },
        });
        if (!projects) {
            throw new Error("There was a problem querying your data");
        }

        return projects;
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

    async savePhoto(photoData: NewPhotoDTO) {
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
