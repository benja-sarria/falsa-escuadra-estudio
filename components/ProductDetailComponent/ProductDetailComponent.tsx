"use client";
import styles from "@/components/ProductDetailComponent/ProductDetailComponent.module.scss";
import { updateProductSubmit } from "@/app/actions";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { SyntheticEvent, useEffect } from "react";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
    resetOpenedProduct,
    setOpenedProduct,
} from "@/redux/features/admin-opened-product-slice";
import { resetAdminDetailOpened } from "@/redux/features/admin-detail-open";
import { StandardAPIError } from "@/utils/api/standarizedErrors";
import { StandardSuccessResponse } from "@/utils/api/standarizedSuccessResponse";
import { ProductTypes } from "@prisma/client";

export const ProductDetailComponent = ({
    productTypes,
}: {
    productTypes: StandardSuccessResponse | undefined;
}) => {
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
            <div className={styles["product-detail-left-column"]}></div>
            <div className={styles["product-detail-right-column"]}>
                <form
                    action={updateProductSubmit}
                    className={styles["product-detail-form-component"]}
                >
                    <label
                        htmlFor="title"
                        className={`${styles["form-label-item"]}`}
                    >
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.title?.label}`}
                        </div>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className={`${styles["form-input-item"]}`}
                            value={
                                openedDetail?.toUpdate?.title
                                    ? openedDetail.toUpdate.title
                                    : openedDetail?.original?.title
                            }
                            onChange={(evt: SyntheticEvent) => {
                                dispatch(
                                    setOpenedProduct({
                                        update: {
                                            title: `${
                                                (evt.target as HTMLFormElement)
                                                    .value
                                            }`,
                                        },
                                    })
                                );
                            }}
                        />
                    </label>
                    <label
                        htmlFor="productType"
                        className={`${styles["form-label-item"]}`}
                    >
                        {" "}
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.productType?.label}`}{" "}
                        </div>
                        <select
                            name="productType"
                            id="productType"
                            className={`${styles["form-input-item"]}`}
                        >
                            {productTypes &&
                                productTypes.data.map(
                                    (productType: ProductTypes) => {
                                        console.log(
                                            "[OPTION]",
                                            productType.type
                                        );
                                        return (
                                            <option
                                                value={`${productType.id}`}
                                                key={`${productType.type}-${productType.id}`}
                                            >
                                                {productType.type}
                                            </option>
                                        );
                                    }
                                )}
                        </select>
                    </label>
                    <label
                        htmlFor="content"
                        className={`${styles["form-label-item"]}`}
                    >
                        {" "}
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.content?.label}`}{" "}
                        </div>
                        <textarea
                            name="content"
                            id="content"
                            className={`${styles["form-input-item"]} ${styles["text-area"]}`}
                            value={
                                openedDetail?.toUpdate?.content
                                    ? openedDetail.toUpdate.content
                                    : openedDetail?.original?.content
                            }
                            onChange={(evt: SyntheticEvent) => {
                                dispatch(
                                    setOpenedProduct({
                                        update: {
                                            content: `${
                                                (evt.target as HTMLFormElement)
                                                    .value
                                            }`,
                                        },
                                    })
                                );
                            }}
                        />
                    </label>

                    <label
                        htmlFor="productImgs"
                        className={`${styles["form-label-item"]}`}
                    >
                        {" "}
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.productType?.label}`}{" "}
                        </div>
                        <input
                            name="productImgs"
                            id="productImgs"
                            type="file"
                            multiple
                            className={`${styles["form-input-item"]}`}
                        />
                    </label>
                </form>
                <div className={`${styles["close-detail-button"]}`}>
                    <ReusableButtonComponent
                        text={<CloseIcon />}
                        onClickHandler={() => {
                            dispatch(resetOpenedProduct());
                            dispatch(resetAdminDetailOpened());
                        }}
                        styleVariants={["admin-go-back-btn"]}
                    />
                </div>
            </div>
        </div>
    );
};
