"use client";
import styles from "@/components/ProcessGridComponent/ProcessGridComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import { StageCardComponent } from "../StageCardComponent/StageCardComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { FlipCardComponent } from "../FlipCardComponent/FlipCardComponent";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
export type FlippedStateType = {
    first: boolean;
    second: boolean;
    third: boolean;
    fourth: boolean;
    fifth: boolean;
    sixth: boolean;
};
export const ProcessGridComponent = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const containerRef = useRef();
    const cardRefs = useRef(new Array());
    const selectCard = (card: any) => {
        setSelectedCard(card);
    };
    const handleCardMouseUp = (e: any, card: any) => {
        selectCard(card);
    };

    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const whiteboardSectionStages =
        siteTexts &&
        siteTexts.messages &&
        siteTexts.messages.home.whiteboardSection.stages;
    return (
        <div
            className={styles["stages-container"]}
            onMouseLeave={() => {
                selectCard(null);
            }}
        >
            {whiteboardSectionStages &&
                Object.keys(whiteboardSectionStages).map(
                    (stageKey: string, index: number) => {
                        const cardVariants = {
                            selected: {
                                rotateX: 0,
                                scale: 1.1,
                                transition: { duration: 0.35 },
                                zIndex: 10,
                                boxShadow:
                                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                            },
                            notSelected: (i: any) => ({
                                rotateX: -180,
                                opacity: 0,
                                zIndex: 10 - Math.abs(i),
                                boxShadow:
                                    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                                transition: { duration: 0.35 },
                            }),
                        };
                        return (
                            <div
                                className={styles["card-container"]}
                                key={stageKey}
                                onMouseEnter={(e) => {
                                    console.log("ENTRÉ");

                                    handleCardMouseUp(e, index + 1);
                                }}
                            >
                                <div className={styles["card-flip-container"]}>
                                    <motion.div
                                        className="card"
                                        key={index + 1}
                                        ref={(el) => cardRefs.current.push(el)}
                                        variants={cardVariants}
                                        animate={
                                            selectedCard === index + 1
                                                ? "selected"
                                                : "notSelected"
                                        }
                                        custom={
                                            selectedCard
                                                ? selectedCard - (index + 1)
                                                : 0
                                        }
                                    >
                                        <AutoAdjustImgComponent
                                            alt={
                                                whiteboardSectionStages[
                                                    stageKey as keyof typeof whiteboardSectionStages
                                                ].image.alt
                                            }
                                            givenClassName={
                                                styles["flip-card-inner-img"]
                                            }
                                            src={`${
                                                whiteboardSectionStages[
                                                    stageKey as keyof typeof whiteboardSectionStages
                                                ].image.src
                                            }`}
                                            calculate="height"
                                            fixedParameter="--img-min-width"
                                        />
                                    </motion.div>
                                </div>
                                <StageCardComponent
                                    stage={
                                        whiteboardSectionStages[
                                            stageKey as keyof typeof whiteboardSectionStages
                                        ]
                                    }
                                />
                            </div>
                        );
                    }
                )}
        </div>
    );
};
