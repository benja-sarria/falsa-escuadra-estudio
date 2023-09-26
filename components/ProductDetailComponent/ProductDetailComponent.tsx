"use client";
import styles from "@/components/ProductDetailComponent/ProductDetailComponent.module.scss";
import { updateProductSubmit } from "@/app/actions";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export const ProductDetailComponent = () => {
    const openedDetail = useAppSelector(
        (state) => state.openedProductValue.value
    );
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    useEffect(() => {
        console.log("[OPENED]", openedDetail);
    }, [openedDetail]);

    return (
        <div className={styles["product-detail-container"]}>
            <div>{openedDetail?.title}</div>
            <div>
                <form action={updateProductSubmit}>
                    <label htmlFor="title">
                        {`${siteTexts?.messages?.adminTexts?.editProductForm?.title?.label}`}
                        <input type="text" name="title" id="title" />
                    </label>
                    <label htmlFor="content">
                        {`${siteTexts?.messages?.adminTexts?.editProductForm?.title?.label}`}
                        <input type="textarea" name="content" id="content" />
                    </label>
                </form>
            </div>
        </div>
    );
};
