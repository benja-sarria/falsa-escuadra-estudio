"use client";

import styles from "@/components/ProjectSelectorComponent/ProjectSelectorComponent.module.scss";
import {
    AvailableActiveProjectsType,
    setActiveProjectsType,
} from "@/redux/features/website/active-project-types-slice";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { MouseEvent, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";

export const ProjectSelectorComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const activeProjectsType = useAppSelector(
        (state) => state.activeProjectsType.value
    );
    const dispatch = useDispatch<AppDispatch>();
    const selectorTexts = siteTexts.messages?.projects.selector;

    const handleSelectActive = (evt: MouseEvent) => {
        const target = evt.target as HTMLElement;

        if (target.dataset.id)
            dispatch(
                setActiveProjectsType(
                    target.dataset.id as AvailableActiveProjectsType
                )
            );
    };

    return (
        <div className={styles["section-container"]}>
            <div className={styles["inner-container"]}>
                <div
                    className={`${styles["active-selector-indicator"]}${
                        activeProjectsType === "own"
                            ? ` ${styles["right-align"]}`
                            : ""
                    }`}
                ></div>
                <button
                    className={`${styles["selector-cell"]}${
                        activeProjectsType === "custom"
                            ? ` ${styles["active-cell"]}`
                            : ""
                    }`}
                    data-id="custom"
                    onClick={(evt) => {
                        handleSelectActive(evt);
                    }}
                >
                    {selectorTexts?.custom.text}
                </button>
                <button
                    className={`${styles["selector-cell"]}${
                        activeProjectsType === "own"
                            ? ` ${styles["active-cell"]}`
                            : ""
                    }`}
                    data-id="own"
                    onClick={(evt) => {
                        handleSelectActive(evt);
                    }}
                >
                    {selectorTexts?.own.text}
                </button>
            </div>
        </div>
    );
};
