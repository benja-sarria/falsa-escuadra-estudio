import { AdminProductsListComponent } from "@/components/AdminProductsListComponent/AdminProductsListComponent";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";

export const ProductsSectionContainer = async () => {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const products = await productServices.getProjectService({});
    // const response = fetch("/api/products");

    return (
        <div>
            <AdminProductsListComponent
                products={
                    products.success
                        ? JSON.parse(JSON.stringify(products))
                        : undefined
                }
            />
        </div>
    );
};
