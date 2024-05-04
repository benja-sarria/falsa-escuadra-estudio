"use client";
import styles from "@/components/ProjectsPortraitComponent/ProjectsPortraitComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useAppSelector } from "@/redux/store";

export const ProjectsPortraitComponent = () => {
    const portraitData = useAppSelector((state) => state.globalLanguage.value)
        .messages?.projects.portrait;
    return (
        <div className={styles["portrait-container"]}>
            <div className={styles["left-column"]}>
                {portraitData && (
                    <AutoAdjustImgComponent
                        alt={portraitData.photo.alt}
                        givenClassName={styles["portrait-inner"]}
                        src={portraitData.photo.src}
                        calculate="height"
                        fixedParameter="--portrait-img-min-width"
                    />
                )}
            </div>
            <div className={styles["right-column"]}>
                <h1>{portraitData?.texts.title}</h1>
                <p>{portraitData?.texts.description}</p>
            </div>
        </div>
    );
};
