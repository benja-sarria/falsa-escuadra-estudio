"use client";
import { MouseEventHandler, useEffect } from "react";
import styles from "./ReusableButtonComponent.module.scss";

export const ReusableButtonComponent = ({
    text,
    onClickHandler,
    styleVariants,
}: {
    text: string;
    onClickHandler: Function & MouseEventHandler;
    styleVariants: string[];
}) => {
    useEffect(() => {
        console.log(styleVariants);
    }, [styleVariants]);

    return (
        <button
            className={`${styles["reusable-btn-base"]}${
                styleVariants && styleVariants.length > 0
                    ? (() => {
                          const mappedStyles = styleVariants.map(
                              (style: string) => {
                                  return styles[style];
                              }
                          );
                          console.log(mappedStyles);

                          return ` ${mappedStyles
                              .toString()
                              .replaceAll(",", " ")}`;
                      })()
                    : ""
            }`}
            onClick={onClickHandler}
        >
            {text}
        </button>
    );
};
