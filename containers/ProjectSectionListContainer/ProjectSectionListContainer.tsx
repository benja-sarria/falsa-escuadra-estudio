import { ProjectSectionListComponent } from "@/components/ProjectSectionListComponent/ProjectSectionListComponent";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";

export const ProjectSectionListContainer = async () => {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const products = await productServices.getProjectService({
        published: true,
    });
    if (products.error) return <>{`There's been an error`}</>;
    return <ProjectSectionListComponent products={products.data} />;
};
