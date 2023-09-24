"use client";
import styles from "@/components/ProductCardComponent/ProductCardComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

import { ProductReceivedType } from "@/types/projectTypes";
import { ProductPhotos } from "@prisma/client";
import { calculateWithMax } from "@/utils/img/proportions";
import { useEffect, useState } from "react";

export const ProductCardComponent = ({
    product,
    type,
}: {
    product: ProductReceivedType;
    type: "large" | "small";
}) => {
    const [portraitPhoto, setPortraitPhoto] = useState<{
        src: string;
        alt: string;
    }>({ src: "/img.png", alt: "string" });
    useEffect(() => {
        const portrait = product.photos.find((photo: ProductPhotos) => {
            console.log("finding", photo.isPortrait);

            return photo.isPortrait;
        });
        console.log("PORTRAIT", portrait);

        if (portrait) {
            setPortraitPhoto({ src: portrait.src, alt: portrait.alt });
        }
    }, [product]);

    return (
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
            </div>
            <div className={styles["text-contents"]}>
                <h5>{`${product.title}`}</h5>
                <p>{`${product.content.slice(0, 20)}...`}</p>
            </div>
        </div>
    );
};
