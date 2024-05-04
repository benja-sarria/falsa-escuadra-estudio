import { AboutUsMapComponent } from "@/components/AboutUsMapComponent/AboutUsMapComponent";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";
import { notFound } from "next/navigation";

export const AboutUsMapContainer = async () => {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const allProducts = await productServices.getProjectService({});

    if (!allProducts.data || allProducts.error) notFound();

    return (
        <AboutUsMapComponent
            products={allProducts.data}
            gmapsKey={process.env.GOOGLE_MAPS_KEY}
        />
    );
};
