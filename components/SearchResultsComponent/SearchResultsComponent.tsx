"use client";
import styles from "@/components/SearchResultsComponent/SearchResultsComponent.module.scss";
import { useAppSelector } from "@/redux/store";

export const SearchResultsComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const searchResultsTexts = siteTexts.messages?.home.searchResults;
    return (
        <div className={styles["results-container"]}>
            <div className={styles["left-column"]}>
                <h4 className={styles["title"]}>
                    {searchResultsTexts && searchResultsTexts.title}
                </h4>
                <input
                    aria-label="search"
                    type="text"
                    name="search"
                    id={"search"}
                    className={styles["input"]}
                />
                <ul className={styles["results-list"]}></ul>
            </div>
            <div></div>
        </div>
    );
};
