"use client";
import styles from "@/components/WhiteBoardComponent/WhiteBoardComponent.module.scss";
import { FlipCardComponent } from "../FlipCardComponent/FlipCardComponent";
import {
    AnimatePresence,
    AnimateSharedLayout,
    LayoutGroup,
} from "framer-motion";
import { useState } from "react";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";
import { useAppSelector } from "@/redux/store";
import { ProcessGridComponent } from "../ProcessGridComponent/ProcessGridComponent";

export const WhiteBoardComponent = () => {
    const [revealed, setRevealed] = useState(false);
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const whiteboardSection =
        siteTexts &&
        siteTexts.messages &&
        siteTexts.messages.home.whiteboardSection;

    const clickHandler = () => setRevealed((prevRevealed) => !prevRevealed);

    return (
        <div className={styles["whiteboard-section"]}>
            <SectionTitleComponent
                text={whiteboardSection?.title?.text}
                styleVariants={["white-variant"]}
            />
            <ProcessGridComponent />
        </div>
    );
};
