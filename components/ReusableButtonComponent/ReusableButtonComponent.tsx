"use client";
import { MouseEventHandler, ReactNode, useEffect } from "react";
import styles from "./ReusableButtonComponent.module.scss";
import { parseVariants } from "@/utils/styles/parseVariants";

export const ReusableButtonComponent = ({
    text,
    onClickHandler,
    styleVariants,
    children,
}: {
    text: string | ReactNode;
    onClickHandler: Function & MouseEventHandler;
    styleVariants: string[];
    children?: ReactNode;
}) => {
    useEffect(() => {
        console.log(styleVariants);
    }, [styleVariants]);

    return (
        <button
            className={`${styles["reusable-btn-base"]}${
                styleVariants && styleVariants.length > 0
                    ? parseVariants(styleVariants, styles)
                    : ""
            }`}
            onClick={onClickHandler}
        >
            {text}
            {children}
        </button>
    );
};
