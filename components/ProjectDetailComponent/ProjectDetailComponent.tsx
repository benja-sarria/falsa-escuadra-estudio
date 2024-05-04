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

    const filteredParagraphs = parsedContent.filter(
        (paragraph) => paragraph.type === "p"
    );

    return (
        <div className={styles["project-detail-container"]}>
            <h1 className={styles["project-detail-title"]}>{project.title}</h1>
            <div className={styles["project-detail-content"]}>
                {parsedContent.map((paragraph, index) => {
                    const photo =
                        project.photos[filteredParagraphs.indexOf(paragraph)];

                    const isParagraph = paragraph.type === "p";

                    return (
                        <React.Fragment key={`${Math.random()}-content`}>
                            {project.photos.length >
                                filteredParagraphs.length &&
                            index === parsedContent.length - 1 ? (
                                project.photos
                                    .slice(
                                        filteredParagraphs.length,
                                        project.photos.length
                                    )
                                    .map((photo) => {
                                        return (
                                            <div
                                                key={photo.src}
                                                className={styles["rest-photo"]}
                                            >
                                                <AutoAdjustImgComponent
                                                    alt={photo.alt}
                                                    src={`${photo.src}`}
                                                    givenClassName={
                                                        styles[
                                                            "img-inner-container"
                                                        ]
                                                    }
                                                    customCallback={(
                                                        imgNode: HTMLImageElement
                                                    ) => {
                                                        autoFigureItOutMeasureLimit(
                                                            imgNode,
                                                            "--img-min-width",
                                                            "--img-min-height"
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    })
                            ) : (
                                <></>
                            )}
                            {paragraph}
                            {photo && isParagraph ? (
                                <AutoAdjustImgComponent
                                    alt={photo.alt}
                                    src={`${photo.src}`}
                                    givenClassName={
                                        styles["img-inner-container"]
                                    }
                                    customCallback={(
                                        imgNode: HTMLImageElement
                                    ) => {
                                        autoFigureItOutMeasureLimit(
                                            imgNode,
                                            "--img-min-width",
                                            "--img-min-height"
                                        );
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
            {/* <div className={styles["project-detail-images-container"]}>
                {project.photos.map((photo) => {
                    return (
                        <React.Fragment key={photo.src}>
                            <AutoAdjustImgComponent
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
                        </React.Fragment>
                    );
                })}
            </div> */}
            <style global={`${true}` as unknown as boolean}>{`
                ::-webkit-scrollbar {
                    width: 8px;
                    background-color:  var(--falsa-escuadra-black);
                    height: 4px;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                    background-color:  var(--falsa-escuadra-black);
                    margin: 0.3em 0em;
                    border-radius: 2rem;
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: var(--falsa-escuadra-gold);
                    border-radius: 2rem;
                }
            `}</style>
        </div>
    );
};
