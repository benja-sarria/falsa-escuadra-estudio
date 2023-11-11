"use client";
import styles from "@/components/StageCardComponent/StageCardComponent.module.scss";
import { FlipCardComponent } from "../FlipCardComponent/FlipCardComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const StageCardComponent = ({
    stage,
}: {
    stage: {
        title: string;
        number: string;
        image: { src: string; alt: string };
    };
}) => {
    return (
        <div className={styles["stage-card-component"]}>
            <h5 className={styles["stage-card-number"]}> {stage.number}.</h5>
            <h5 className={styles["stage-card-title"]}> {stage.title}.</h5>
        </div>
    );
};
