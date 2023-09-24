"use client";
import styles from "@/components/AdminProductsListComponent/AdminProductsListComponent.module.scss";
import { setProducts } from "@/redux/features/products-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { StandardSuccessResponse } from "@/utils/api/standarizedSuccessResponse";
import { Product } from "@prisma/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProductCardComponent } from "../ProductCardComponent/ProductCardComponent";
import { ProductReceivedType } from "@/types/projectTypes";

export const AdminProductsListComponent = ({
    products,
}: {
    products: Promise<Response>;
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const stateProducts = useAppSelector((state) => state.productsValue.value);

    useEffect(() => {
        (async () => {
            const awaitedResponse = await products;
            const parsedResponse =
                (await awaitedResponse.json()) as StandardSuccessResponse;
            dispatch(
                setProducts({
                    products: parsedResponse.data,
                    sortCriteria: "id",
                })
            );
        })();
    }, [products]);

    useEffect(() => {
        console.log("STATE-PRODUCTS", stateProducts);
    }, [stateProducts]);

    return (
        <div className={styles["card-list-container"]}>
            {stateProducts.products.length > 0 &&
                stateProducts.products.map(
                    (product: ProductReceivedType, index: number) => {
                        return (
                            <React.Fragment
                                key={`${product.title.replaceAll(" ", "-")}`}
                            >
                                <ProductCardComponent
                                    product={product}
                                    type={index % 2 !== 0 ? "small" : "large"}
                                />
                            </React.Fragment>
                        );
                    }
                )}
        </div>
    );
};