"use client";
import { MouseEventHandler, ReactNode, useEffect } from "react";
import styles from "./ReusableButtonComponent.module.scss";
import { parseVariants } from "@/utils/styles/parseVariants";

export const ReusableButtonComponent = ({
    text,
    onClickHandler,
    styleVariants,
    children,
    icon,
    inverted,
}: {
    text?: string;
    onClickHandler?: Function & MouseEventHandler;
    styleVariants: string[];
    children?: ReactNode;
    icon?: ReactNode;
    inverted?: Boolean;
}) => {
    return (
        <button
            className={`${styles["reusable-btn-base"]}${
                styleVariants && styleVariants.length > 0
                    ? parseVariants(styleVariants, styles)
                    : ""
            }`}
            onClick={onClickHandler}
        >
            {inverted ? (
                <>
                    {icon} {text}
                </>
            ) : (
                <>
                    {text} {icon}
                </>
            )}

            {children}
        </button>
    );
};
