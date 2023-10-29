"use client";
import styles from "@/components/HomePortraitComponent/HomePortraitComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const HomePortraitComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const portraitTexts =
        siteTexts && siteTexts.messages && siteTexts.messages.home.homePortrait;
    return (
        <div className={styles["home-portrait-container"]}>
            <div className={styles["home-portrait-title-container"]}>
                <h1 className={styles["home-portrait-title-element"]}>
                    {portraitTexts &&
                        Object.keys(portraitTexts.title).map(
                            (lineKey: string, index: number) => {
                                return (
                                    <p
                                        key={lineKey}
                                        className={
                                            styles["home-portrait-title-line"]
                                        }
                                    >
                                        {index === 1 && <span>aa</span>}
                                        {index === 2 && <span>aaaaaaaaaa</span>}
                                        {portraitTexts.title[lineKey]}
                                    </p>
                                );
                            }
                        )}
                </h1>
            </div>
            <div className={styles["home-portrait-left-column"]}>
                <div className={styles["home-portrait-left-text-content"]}>
                    <p className={styles["home-portrait-left-text-element"]}>
                        {portraitTexts && portraitTexts.leftColumn.content.text}
                    </p>
                </div>
                <div className={styles["home-portrait-left-images-container"]}>
                    {portraitTexts &&
                        Object.keys(portraitTexts.leftColumn.images).map(
                            (imageKey: string, index: number) => {
                                return (
                                    <div
                                        key={imageKey}
                                        className={styles["image-outer-canvas"]}
                                    >
                                        <AutoAdjustImgComponent
                                            alt={`${
                                                portraitTexts
                                                    ? portraitTexts.leftColumn
                                                          .images[imageKey].alt
                                                    : "photo"
                                            }`}
                                            givenClassName={
                                                styles["pattern-image-inner"]
                                            }
                                            src={`${
                                                portraitTexts
                                                    ? portraitTexts.leftColumn
                                                          .images[imageKey].src
                                                    : "/img.png"
                                            }`}
                                            calculate="width"
                                            fixedParameter="--pattern-min-height"
                                        />
                                    </div>
                                );
                            }
                        )}
                </div>
            </div>
            <div className={styles["home-portrait-right-column"]}>
                <div className={styles["home-portrait-img-outer"]}>
                    <AutoAdjustImgComponent
                        alt={`${
                            portraitTexts
                                ? portraitTexts.rightColumn.image.alt
                                : "photo"
                        }`}
                        givenClassName={styles["portrait-image-inner"]}
                        src={`${
                            portraitTexts
                                ? portraitTexts.rightColumn.image.src
                                : "/img.png"
                        }`}
                        calculate="width"
                        fixedParameter="--img-min-height"
                    />
                </div>

                <div className={styles["home-portrait-right-text-content"]}>
                    <p className={styles["home-portrait-right-text-element"]}>
                        {portraitTexts &&
                            portraitTexts.rightColumn.content.text}
                    </p>
                </div>
            </div>
            <div className={styles["home-portrait-background-rectangle"]}></div>
        </div>
    );
};
