"use client";
import styles from "@/components/ProjectDetailComponent/ProjectDetailComponent.module.scss";
import { ProductWithInclude } from "@/types/projectTypes";
import { Prisma, Product } from "@prisma/client";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { autoFigureItOutMeasureLimit } from "@/utils/img/proportions";
import React from "react";
import { parseProjectContent } from "@/utils/text/parseProjectContent";

export const ProjectDetailComponent = ({
    project,
}: {
    project: Prisma.ProductGetPayload<typeof ProductWithInclude>;
}) => {
    const parsedContent = parseProjectContent(project.content);

    return (
        <div className={styles["project-detail-container"]}>
            <h1 className={styles["project-detail-title"]}>{project.title}</h1>
            <p className={styles["project-detail-content"]}>{parsedContent}</p>
            <div className={styles["project-detail-images-container"]}>
                {project.photos.map((photo) => {
                    return (
                        <AutoAdjustImgComponent
                            key={photo.src}
                            alt={photo.alt}
                            src={`${photo.src}`}
                            givenClassName={styles["img-inner-container"]}
                            customCallback={(imgNode: HTMLImageElement) => {
                                autoFigureItOutMeasureLimit(
                                    imgNode,
                                    "--img-min-width",
                                    "--img-min-height"
                                );
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
