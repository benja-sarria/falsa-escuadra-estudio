import styles from "@/components/CustomProductCardComponent/CustomProductCardComponent.module.scss";
import { ProductReceivedType } from "@/types/projectTypes";
import { Skeleton } from "@mui/material";
import { ProductPhotos } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import {
    autoDetermineSize,
    autoFigureItOutMeasureAfterLoad,
} from "@/utils/img/proportions";
import { useRouter } from "next/navigation";

export const CustomProductCardComponent = ({
    loading,
    type,
    product,
}: {
    loading?: boolean;
    type: "large" | "small";
    product: ProductReceivedType;
}) => {
    const [portraitPhoto, setPortraitPhoto] = useState<{
        src: string;
        alt: string;
    }>({ src: "/img.png", alt: "string" });

    const router = useRouter();

    const clickHandler = useCallback(() => {
        router.push(`/projects/${product.productSlug}`);
    }, [product.productSlug]);

    useEffect(() => {
        if (product) {
            const portrait = product.photos.find((photo: ProductPhotos) => {
                return photo.isPortrait;
            });

            if (portrait) {
                setPortraitPhoto({
                    src: portrait.src ?? "/img.png",
                    alt: portrait.alt,
                });
            }
        }
    }, [product]);
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
                data-type="skeleton"
            />
        </div>
    ) : (
        <div
            className={`${styles["card-container"]} ${
                type === "large" ? styles["large-card"] : styles["small-card"]
            }`}
            onClick={clickHandler}
        >
            {type === "large" && (
                <h2 className={styles["title"]}>{product.title}</h2>
            )}
            <div className={styles["product-card-img-outer-container"]}>
                <AutoAdjustImgComponent
                    src={`${
                        portraitPhoto.src
                            ? portraitPhoto.src
                            : "/static/placeholder.webp"
                    }`}
                    alt={`${portraitPhoto.alt}`}
                    givenClassName={styles["product-img-inner-container"]}
                    calculate={type === "large" ? "height" : "width"}
                    customCallback={(imgNode: HTMLImageElement) => {
                        autoDetermineSize(
                            imgNode,
                            type === "large"
                                ? "--large-img-width"
                                : "--small-img-width",
                            type === "large"
                                ? "--large-img-height"
                                : "--small-img-height"
                        );
                    }}
                    fixedParameter={
                        type === "large"
                            ? "--large-img-width"
                            : "--small-img-width"
                    }
                />
            </div>
            {type === "small" && (
                <h2 className={styles["title"]}>{product.title}</h2>
            )}
        </div>
    );
};
