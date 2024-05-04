import { ProjectSectionListComponent } from "@/components/ProjectSectionListComponent/ProjectSectionListComponent";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";
import { Product } from "@prisma/client";

export const ProjectSectionListContainer = async () => {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const products = await productServices.getProjectService({
        published: true,
    });
    if (products.error) return <>{`There's been an error`}</>;

    const parsedProducts = products.data.reduce(
        (acc: Product[], data: Product) => {
            const repeatedProduct = acc?.find(
                (product: Product) =>
                    product.title === data.title &&
                    product.content === data.content
            );
            if (!repeatedProduct) {
                acc.push(data);
            }

            return acc;
        },
        []
    );
    return <ProjectSectionListComponent products={parsedProducts} />;
};
