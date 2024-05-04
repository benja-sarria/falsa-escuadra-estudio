"use client";

import styles from "@/components/ContactPortraitComponent/ContactPortraitComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useAppSelector } from "@/redux/store";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";

export const ContactPortraitComponent = () => {
    const globalTexts = useAppSelector((state) => state.globalLanguage.value);
    const contactTexts = globalTexts.messages?.contact;
    return (
        <div className={styles["portrait-container"]}>
            <div className={styles["left-column"]}>
                <SectionTitleComponent
                    text={contactTexts?.pageTitle.text}
                    styleVariants={["contact-page"]}
                />
                <p className={styles["page-subtitle"]}>
                    {contactTexts?.pageSubtitle.text}
                </p>
            </div>
            <div className={styles["right-column"]}>
                <div className={styles["seal-container"]}>
                    <AutoAdjustImgComponent
                        alt="contact seal"
                        givenClassName={styles["contact-seal-inner"]}
                        src={contactTexts?.seal.img.src ?? "/img.png"}
                        calculate="height"
                        fixedParameter="--seal-min-width"
                    />
                    <div className={styles["text-wrapper"]}>
                        <AutoAdjustImgComponent
                            alt="contact seal"
                            givenClassName={styles["contact-seal-text"]}
                            src={contactTexts?.seal.text.src ?? "/img.png"}
                            calculate="height"
                            fixedParameter="--seal-inner-text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
