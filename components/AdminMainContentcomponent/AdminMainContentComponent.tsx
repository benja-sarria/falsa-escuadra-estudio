"use client";

import { ProductDetailContainer } from "@/containers/ProductDetailContainer/ProductDetailContainer";
import { ProductsSectionContainer } from "@/containers/ProductsSectionContainer/ProductsSectionContainer";
import { useAppSelector } from "@/redux/store";
import React, { ReactNode } from "react";

export const AdminMainContentComponent = ({
    children,
}: {
    children: ReactNode;
}) => {
    const section = useAppSelector((state) => state.activeSection.value);
    const openedDetail = useAppSelector(
        (state) => state.adminDetailOpened.value
    );

    if (section === "products" && !openedDetail)
        return (children as ReactNode[])[0];
    if (section === "products") return (children as ReactNode[])[1];
    /* (() => {
        if (section === "products" && !openedDetail)
            return <ProductsSectionContainer />;
        if (section === "products") return <ProductDetailContainer />;
        return <></>;
    })(); */
};
