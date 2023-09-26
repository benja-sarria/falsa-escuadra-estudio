"use client";

import { ProductDetailContainer } from "@/containers/ProductDetailContainer/ProductDetailContainer";
import { ProductsSectionContainer } from "@/containers/ProductsSectionContainer/ProductsSectionContainer";
import { useAppSelector } from "@/redux/store";

export const AdminMainContentComponent = () => {
    const section = useAppSelector((state) => state.activeSection.value);
    const openedDetail = useAppSelector(
        (state) => state.adminDetailOpened.value
    );

    return (() => {
        if (section === "products" && !openedDetail)
            return <ProductsSectionContainer />;
        if (section === "products") return <ProductDetailContainer />;
        return <></>;
    })();
};
