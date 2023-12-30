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
import { setLoading } from "@/redux/features/loading-slice";

export const AdminProductsListComponent = ({
    products,
}: {
    products: StandardSuccessResponse | undefined;
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const stateProducts = useAppSelector((state) => state.productsValue.value);
    const loadingState = useAppSelector((state) => state.loading.value);

    useEffect(() => {
        dispatch(setLoading(true));
        console.log("[PRODUCTS]", products);
        if (products) {
            dispatch(
                setProducts({
                    products: products.data,
                    sortCriteria: "id",
                })
            );
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
        }
    }, [products]);

    useEffect(() => {
        console.log("STATE-PRODUCTS", stateProducts);
    }, [stateProducts]);

    return (
        <div
            className={styles["outer-container"]}
            id="products-outer-container"
        >
            <div className={styles["card-list-container"]}>
                {loadingState
                    ? [1, 2, 3, 4, 5, 6, 7, 8].map(
                          (instance: any, index: number) => {
                              return (
                                  <React.Fragment key={`${instance}-loader`}>
                                      <ProductCardComponent
                                          loading={loadingState}
                                          type={
                                              index % 2 !== 0
                                                  ? "small"
                                                  : "large"
                                          }
                                          editable={true}
                                          adminCard={true}
                                      />
                                  </React.Fragment>
                              );
                          }
                      )
                    : stateProducts.products.length > 0 &&
                      stateProducts.products.map(
                          (product: ProductReceivedType, index: number) => {
                              return (
                                  <React.Fragment
                                      key={`${product.title.replaceAll(
                                          " ",
                                          "-"
                                      )}`}
                                  >
                                      <ProductCardComponent
                                          product={product}
                                          type={
                                              index % 2 !== 0
                                                  ? "small"
                                                  : "large"
                                          }
                                          editable={true}
                                          adminCard={true}
                                      />
                                  </React.Fragment>
                              );
                          }
                      )}
            </div>
        </div>
    );
};
