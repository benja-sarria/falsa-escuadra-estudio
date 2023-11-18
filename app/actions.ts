"use server";

import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";
import { revalidatePath } from "next/cache";

export async function updateProductSubmit(formData: FormData) {}

export async function deleteProductPhoto(formData: FormData) {
    const entries = Object.fromEntries(formData);
    console.log("SERVER-ACTION", entries);
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const response = await productServices.removePhotoService({
        id: +entries.photoSlug,
    });
    console.log("RESPONSE", response);
}

export async function updateProductPhoto(formData: FormData) {
    const entries = Object.fromEntries(formData.entries());
    console.log("SERVER-ACTION", entries);
    const parsedImages = JSON.parse(entries.newImage as string);
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const response = await productServices.updatePhotoService({
        id: +entries.photoSlug,
        src: { data: parsedImages.data, prefix: parsedImages.prefix },
        postSlug: `${entries.postSlug}`,
    });
    console.log("RESPONSE", response);
    if (response.error) {
        return response;
    }
    return revalidatePath(`${entries.validatePath}`);
}

export async function searchProducts(searchTerm: string) {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    console.log("SEARCHING");

    const results = await productServices.getProjectService({
        OR: [
            {
                title: {
                    contains: searchTerm,
                },
            },
            { content: { contains: searchTerm } },
        ],
    });
    console.log("results", results);

    return results;
    // return revalidatePath(`${entries.validatePath}`);
}
