"use client";
import styles from "@/components/SearchBoxComponent/SearchBoxComponent.module.scss";
import { SvgIcon } from "@mui/material";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setSearch } from "@/redux/features/website/searchbox-slice";

export const SearchBoxComponent = () => {
    const search = useAppSelector((state) => state.search.value);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div
            className={`${styles["search-box-container"]}${
                search.opened ? ` ${styles["opened-searchbox"]}` : ""
            }`}
        >
            <div>
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
                    }}
                >
                    <AutoAdjustImgComponent
                        alt="search icon"
                        givenClassName={styles["search-icon-inner"]}
                        src="/assets/img/layout/search.svg"
                        calculate="height"
                        fixedParameter="--icon-min-width"
                    />
                </button>
            </div>
        </div>
    );
};
