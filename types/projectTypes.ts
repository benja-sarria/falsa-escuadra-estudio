import { Prisma, Product, ProductPhotos } from "@prisma/client";

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

export interface UpdatePhotoDataInterface {
    src: { data: string; prefix: string };
    id: number;
    postSlug: string;
}

export type PhotoQueryParamsType = {
    productId?: number;
    isPortrait?: boolean;
    id?: number;
};
export interface UpdateOrDeletePhotoInterface
    extends Partial<PhotoDataInterface> {
    id: number;
}

export interface ProductReceivedType extends Product {
    photos: ProductPhotos[];
}

export type AvailableProductActionsType = "edit" | "remove" | "edit-img";

const ProductWithInclude = Prisma.validator<Prisma.ProductDefaultArgs>()({
    include: { photos: true },
});

// 3: This type will include a user and all their posts
export type ProductWithIncludeType = Prisma.ProductGetPayload<
    typeof ProductWithInclude
>;
