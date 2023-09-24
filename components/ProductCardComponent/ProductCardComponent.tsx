"use client";
import styles from "@/components/ProductCardComponent/ProductCardComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

import {
    AvailableProductActionsType,
    ProductReceivedType,
} from "@/types/projectTypes";
import { ProductPhotos } from "@prisma/client";
import { calculateWithMax } from "@/utils/img/proportions";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { ReusableActionButtonComponent } from "../ReusableActionButtonComponent/ReusableActionButtonComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppSelector } from "@/redux/store";

export const ProductCardComponent = ({
    product,
    type,
    loading,
}:
    | {
          product: ProductReceivedType;
          type: "large" | "small";
          loading?: boolean;
      }
    | any) => {
    const [portraitPhoto, setPortraitPhoto] = useState<{
        src: string;
        alt: string;
    }>({ src: "/img.png", alt: "string" });
    const availableActions = ["edit", "remove"];
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    useEffect(() => {
        if (product) {
            const portrait = product.photos.find((photo: ProductPhotos) => {
                console.log("finding", photo.isPortrait);

                return photo.isPortrait;
            });
            console.log("PORTRAIT", portrait);

            if (portrait) {
                setPortraitPhoto({ src: portrait.src, alt: portrait.alt });
            }
        }
    }, [product]);

    useEffect(() => {
        console.log("RECEIVING-TEXTS", siteTexts);
    }, [siteTexts]);

    return loading ? (
        <div
            className={`${styles["product-card-container"]} ${
                type === "large" ? styles["large-card"] : styles["small-card"]
            } ${styles["loader"]}`}
        >
            <Skeleton
                sx={{ bgcolor: "grey.300" }}
                variant="rectangular"
                width={210}
                height={118}
                className={styles["product-card-img-outer-container"]}
            />
        </div>
    ) : (
        <div
            className={`${styles["product-card-container"]} ${
                type === "large" ? styles["large-card"] : styles["small-card"]
            }`}
        >
            <div className={styles["product-card-img-outer-container"]}>
                <AutoAdjustImgComponent
                    src={`${portraitPhoto.src}`}
                    alt={`${portraitPhoto.alt}`}
                    givenClassName={styles["product-img-inner-container"]}
                    calculate="height"
                    fixedParameter={
                        type === "large"
                            ? "--large-card-img-max-width"
                            : "--small-card-img-max-width"
                    }
                />
                <div className={styles["card-action-buttons-container"]}>
                    {availableActions.map((action: string, index: number) => {
                        return (
                            <React.Fragment key={`${action}-btn`}>
                                {" "}
                                <ReusableActionButtonComponent
                                    action={
                                        action as AvailableProductActionsType
                                    }
                                    icon={
                                        action === "edit" ? (
                                            <EditIcon />
                                        ) : (
                                            <DeleteForeverIcon />
                                        )
                                    }
                                    text={siteTexts.messages ? "" : ""}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <div className={styles["text-contents"]}>
                <h5>{`${product.title}`}</h5>
                <p>{`${product.content.slice(0, 20)}...`}</p>
            </div>
        </div>
    );
};
