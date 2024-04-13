"use server";
import { HomeProductCarouselComponent } from "@/components/HomeProductCarouselComponent/HomeProductCarouselComponent";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";

export const HomeProductCarouselContainer = async () => {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const products = await productServices.getProjectService({
        published: true,
    });

    if (products.success && products.data)
        return <HomeProductCarouselComponent products={products.data} />;
    return <></>;
};
