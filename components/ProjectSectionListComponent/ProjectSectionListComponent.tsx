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
import { CustomProductCardComponent } from "../CustomProductCardComponent/CustomProductCardComponent";

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
        <div
            className={`${styles["project-section-container"]}${
                activeProductType === "own" && stateProducts.length > 0
                    ? ` ${styles["own-section"]}`
                    : ""
            } `}
        >
            {activeProductType === "own" && stateProducts.length > 0 && (
                <div className={styles["background-overlay"]}></div>
            )}
            {stateProducts.length < 1 ? (
                <h3 className={styles["not-found"]}>
                    Proximamente tendremos más productos para sorprenderte...
                </h3>
            ) : (
                stateProducts.map((product, index) =>
                    activeProductType === "custom" ? (
                        <ProductCardComponent
                            key={product.id}
                            product={product}
                            type={
                                (index + 1) % 4 == 0 || (index + 4) % 4 == 0
                                    ? "large"
                                    : "small"
                            }
                        />
                    ) : (
                        <CustomProductCardComponent
                            key={product.id}
                            product={product}
                            type={
                                (index + 2) % 4 == 0 || (index + 3) % 4 == 0
                                    ? "large"
                                    : "small"
                            }
                        />
                    )
                )
            )}
        </div>
    );
};
