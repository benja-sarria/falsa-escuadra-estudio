"use client";

import styles from "@/components/AboutUsPortraitComponent/AboutUsPortraitComponent.module.scss";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";
import { useAppSelector } from "@/redux/store";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const AboutUsPortraitComponent = () => {
    const globalTexts = useAppSelector((state) => state.globalLanguage.value);
    const aboutUsTexts = globalTexts.messages?.aboutUs;
    return (
        <div className={styles["portrait-container"]}>
            <div className={styles["portrait-background-rectangle"]}></div>
            <div className={styles["left-column"]}>
                <SectionTitleComponent
                    styleVariants={["about-us"]}
                    text={`${aboutUsTexts?.pageTitle.text}`}
                />
                <AutoAdjustImgComponent
                    alt={`${aboutUsTexts?.images.left.alt}`}
                    givenClassName={styles["left-img-inner"]}
                    src={aboutUsTexts?.images.left.src ?? "/img.png"}
                    calculate="height"
                    fixedParameter="--img-min-width"
                />
            </div>
            <div className={styles["right-column"]}>
                <AutoAdjustImgComponent
                    alt={`${aboutUsTexts?.images.right.alt}`}
                    givenClassName={styles["right-img-inner"]}
                    src={aboutUsTexts?.images.right.src ?? "/img.png"}
                    calculate="height"
                    fixedParameter="--img-min-width"
                />
                <p className={styles["portrait-text"]}>
                    {aboutUsTexts?.portraitText.text}
                </p>
            </div>
        </div>
    );
};
