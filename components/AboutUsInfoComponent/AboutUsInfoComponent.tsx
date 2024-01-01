"use client";

import styles from "@/components/AboutUsInfoComponent/AboutUsInfoComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import { AboutUsInfoCardComponent } from "../AboutUsInfoCardComponent/AboutUsInfoCardComponent";

export const AboutUsInfoComponent = () => {
    const globalTexts = useAppSelector((state) => state.globalLanguage.value);
    const aboutUsTexts = globalTexts.messages?.aboutUs.infoSection;
    return (
        <div className={styles["section-container"]}>
            <div className={styles["grid-section"]}>
                <div className={styles["title-element"]}>
                    <p>{aboutUsTexts?.title}</p>
                </div>
                <div className={styles["hero"]}>
                    <h2>{aboutUsTexts?.heroText}</h2>
                </div>
                {aboutUsTexts &&
                    Object.keys(aboutUsTexts.cards).map((cardKey, index) => {
                        return (
                            <AboutUsInfoCardComponent
                                key={cardKey}
                                info={
                                    aboutUsTexts.cards[
                                        cardKey as keyof typeof aboutUsTexts.cards
                                    ]
                                }
                                number={index + 1}
                                staticText={aboutUsTexts.cardStaticTitle}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
