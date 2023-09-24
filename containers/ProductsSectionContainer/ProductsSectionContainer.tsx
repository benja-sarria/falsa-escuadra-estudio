import { AdminProductsListComponent } from "@/components/AdminProductsListComponent/AdminProductsListComponent";

export const ProductsSectionContainer = () => {
    const response = fetch("/api/products");

    return (
        <div>
            <AdminProductsListComponent products={response} />
        </div>
    );
};
