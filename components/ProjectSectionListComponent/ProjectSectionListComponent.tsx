"use client";
import styles from "@/components/ProjectSectionListComponent/ProjectSectionListComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import {
    ProductReceivedType,
    ProductTypeWithIncludes,
} from "@/types/projectTypes";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { ProductCardComponent } from "../ProductCardComponent/ProductCardComponent";

export const ProjectSectionListComponent = ({
    products,
}: {
    products: ProductTypeWithIncludes[];
}) => {
    const activeProductType = useAppSelector(
        (state) => state.activeProjectsType.value
    );
    const [stateProducts, setStateProducts] = useState<
        ProductTypeWithIncludes[]
    >([]);
    useEffect(() => {
        console.log("PRODUCTS", products, activeProductType);

        if (products)
            setStateProducts(
                (() => {
                    if (activeProductType === "own")
                        return products.filter(
                            (product) =>
                                product.productType.type === activeProductType
                        );
                    return products.filter(
                        (products) => products.productType.type === "custom"
                    );
                })()
            );
    }, [products, activeProductType]);

    return (
        <div className={styles["project-section-container"]}>
            {stateProducts.map((product, index) => (
                <ProductCardComponent
                    key={product.id}
                    product={product}
                    type={index % 2 === 0 ? "large" : "small"}
                />
            ))}
        </div>
    );
};
