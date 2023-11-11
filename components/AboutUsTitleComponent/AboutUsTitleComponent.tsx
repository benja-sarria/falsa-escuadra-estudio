"use client";
import { useAppSelector } from "@/redux/store";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";

export const AboutUsTitleComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const aboutUsTexts =
        siteTexts.messages && siteTexts.messages.home.aboutUsSection;
    return (
        <SectionTitleComponent
            styleVariants={[]}
            text={`${aboutUsTexts?.sectionTitle.text}`}
        />
    );
};
