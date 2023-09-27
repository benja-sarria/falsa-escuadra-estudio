"use client";
import styles from "@/components/ProductDetailComponent/ProductDetailComponent.module.scss";
import { updateProductSubmit } from "@/app/actions";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { resetOpenedProduct } from "@/redux/features/admin-opened-product-slice";
import { resetAdminDetailOpened } from "@/redux/features/admin-detail-open";

export const ProductDetailComponent = () => {
    const openedDetail = useAppSelector(
        (state) => state.openedProductValue.value
    );
    const dispatch = useDispatch<AppDispatch>();
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    useEffect(() => {
        console.log("[OPENED]", openedDetail);
    }, [openedDetail]);

    return (
        <div className={styles["product-detail-container"]}>
            <div></div>
            <div>
                <form action={updateProductSubmit}>
                    <label htmlFor="title">
                        {`${siteTexts?.messages?.adminTexts?.editProductForm?.title?.label}`}
                        <input type="text" name="title" id="title" />
                    </label>
                    <label htmlFor="content">
                        {`${siteTexts?.messages?.adminTexts?.editProductForm?.content?.label}`}
                        <input type="textarea" name="content" id="content" />
                    </label>
                    <label htmlFor="productType">
                        {`${siteTexts?.messages?.adminTexts?.editProductForm?.productType?.label}`}
                        <select name="productType" id="productType" />
                    </label>
                </form>
                <div>
                    <ReusableButtonComponent
                        text={<CloseIcon />}
                        onClickHandler={() => {
                            dispatch(resetOpenedProduct());
                            dispatch(resetAdminDetailOpened());
                        }}
                        styleVariants={[]}
                    />
                </div>
            </div>
        </div>
    );
};
