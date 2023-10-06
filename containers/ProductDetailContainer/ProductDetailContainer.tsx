"use server";
import { ProductDetailComponent } from "@/components/ProductDetailComponent/ProductDetailComponent";
import { ProductTypesPrismaDao } from "@/models/daos/productTypes.dao";
import { ProductTypeServices } from "@/services/productType.services";

export const ProductDetailContainer = async () => {
    const productTypesServices = new ProductTypeServices(
        new ProductTypesPrismaDao()
    );
    const productTypes = await productTypesServices.getProductTypesService({});
    console.log("[TYPES]", productTypes);

    return (
        <ProductDetailComponent
            productTypes={
                productTypes.success ? { ...productTypes } : undefined
            }
        />
    );
};
