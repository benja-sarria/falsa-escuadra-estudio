"use client";
import styles from "@/components/SearchBoxComponent/SearchBoxComponent.module.scss";
import { SvgIcon } from "@mui/material";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setSearch } from "@/redux/features/website/searchbox-slice";

export const SearchBoxComponent = () => {
    const search = useAppSelector((state) => state.search.value);

    const iconRef = useRef(null);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            className={`${styles["search-box-container"]}${
                search.opened ? ` ${styles["opened-searchbox"]}` : ""
            }`}
        >
            <div className={styles["button-container"]}>
                <button
                    aria-label="search"
                    className={styles["search-box-button"]}
                    onClick={() => {
                        dispatch(
                            setSearch({
                                opened: !search.opened,
                                term: undefined,
                            })
                        );
                        if (iconRef.current)
                            !search.opened
                                ? (
                                      iconRef.current as HTMLElement
                                  ).classList.add(styles["active"])
                                : (
                                      iconRef.current as HTMLElement
                                  ).classList.remove(styles["active"]);
                    }}
                >
                    <div className={`${styles["search-icon"]}`} ref={iconRef}>
                        <span
                            className={`${styles["search-line"]} ${styles["main-line"]}`}
                        ></span>
                        <span
                            className={`${styles["search-circle"]} ${styles["third"]}`}
                        ></span>
                    </div>

                    {/*    <AutoAdjustImgComponent
                        alt="search icon"
                        givenClassName={styles["search-icon-inner"]}
                        src="/assets/img/layout/search.svg"
                        calculate="height"
                        fixedParameter="--icon-min-width"
                    /> */}
                </button>
            </div>
        </div>
    );
};
