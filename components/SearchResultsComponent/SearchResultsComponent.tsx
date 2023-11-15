"use client";
import styles from "@/components/SearchResultsComponent/SearchResultsComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import { SvgIcon } from "@mui/material";
import GoldSearch from "@/public/assets/img/layout/goldsearch.svg";

export const SearchResultsComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const searchResultsTexts = siteTexts.messages?.home.searchResults;
    return (
        <div className={styles["results-container"]}>
            <div className={styles["left-column"]}>
                <h4 className={styles["title"]}>
                    {searchResultsTexts && searchResultsTexts.title}
                </h4>
                <div className={styles["input-container"]}>
                    <SvgIcon
                        className={styles["gold-search"]}
                        viewBox="100 100"
                    >
                        <GoldSearch />
                    </SvgIcon>
                    <input
                        aria-label="search"
                        type="text"
                        name="search"
                        id={"search"}
                        className={styles["input"]}
                    />
                </div>
                <ul className={styles["results-list"]}></ul>
            </div>
            <div></div>
        </div>
    );
};
