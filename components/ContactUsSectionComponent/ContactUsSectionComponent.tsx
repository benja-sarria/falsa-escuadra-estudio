"use client";
import Arrow from "@/public/assets/img/icons/arrow.svg";
import styles from "@/components/ContactUsSectionComponent/ContactUsSectionComponent.module.scss";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { useAppSelector } from "@/redux/store";

export const ContactUsSectionComponent = () => {
    const siteTexts = useAppSelector(
        (state) => state.globalLanguage.value.messages
    );
    const contactUsTexts = siteTexts?.home.contactUsSection;
    return (
        <div className={styles["contact-us-section"]}>
            <div className={styles["background-rectangle"]}></div>
            <div className={styles["hero-container"]}>
                <div className={styles["hero-left-column"]}>
                    <p className={styles["column-subtitle"]}>
                        {contactUsTexts?.sectionPreTitle}
                    </p>
                    <SectionTitleComponent
                        text={`${contactUsTexts?.sectionTitle}`}
                        styleVariants={["contact-us-section"]}
                    />
                    <ReusableButtonComponent
                        styleVariants={["white-variant", "contact-btn-variant"]}
                        text={`${contactUsTexts?.btnText}`}
                        icon={
                            <Arrow
                                style={{
                                    transform: "scale(.8)",
                                }}
                            />
                        }
                    />
                </div>
                <div className={styles["hero-right-column"]}></div>
            </div>
        </div>
    );
};
