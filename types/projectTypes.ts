import { Product, ProductPhotos } from "@prisma/client";

export interface PhotosObjectInterface {
    baseSrc: string;
    alt: string;
    isPortrait: boolean;
}

export interface ProjectDataInterface
    extends Omit<
        Product,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "published"
        | "updatedBy"
        | "updatedById"
    > {
    photos: PhotosObjectInterface[];
    updatedById: number;
}

export type ProjectQueryParamsType = {
    title?: string;
    content?: string;
    published?: boolean;
    updatedById?: number;
    productTypeId?: number;
    id?: number;
};

export interface UpdateOrDeleteProjectInterface extends ProjectDataInterface {
    id: number;
}

export interface PhotoDataInterface
    extends Omit<ProductPhotos, "id" | "createdAt" | "updatedAt"> {}

export type PhotoQueryParamsType = {
    productId?: number;
    isPortrait?: boolean;
    id?: number;
};
export interface UpdateOrDeletePhotoInterface extends PhotoDataInterface {
    id: number;
}
