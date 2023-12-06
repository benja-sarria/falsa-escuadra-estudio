"use client";
import styles from "@/components/SearchResultsComponent/SearchResultsComponent.module.scss";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { SvgIcon } from "@mui/material";
import GoldSearch from "@/public/assets/img/layout/goldsearch.svg";
import { SkeletonPlaceholderComponent } from "../SkeletonPlaceholderComponent/SkeletonPlaceholderComponent";
import { useDispatch } from "react-redux";
import { SyntheticEvent } from "react";
import {
    resetResults,
    setSearch,
} from "@/redux/features/website/searchbox-slice";
import { searchProducts } from "@/app/actions";
import { debounce } from "@/utils/debouncer";
import { parseResultsText } from "@/utils/search/parseResultsText";
import { ProjectPrevisualizationComponent } from "../ProjectPrevisualizationComponent/ProjectPrevisualizationComponent";

export const SearchResultsComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const searchResultsTexts = siteTexts.messages?.home.searchResults;
    const search = useAppSelector((state) => state.search.value);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className={styles["results-container"]}>
            <div className={styles["left-column"]}>
                <h4 className={styles["title"]}>
                    {searchResultsTexts && searchResultsTexts.title}
                </h4>
                <div className={styles["input-container"]}>
                    <SvgIcon
                        className={styles["gold-search"]}
                        viewBox={"100 100"}
                    >
                        <GoldSearch />
                    </SvgIcon>
                    <input
                        aria-label="search"
                        type="text"
                        name="search"
                        id={"search"}
                        className={styles["input"]}
                        onChange={async (evt: SyntheticEvent) => {
                            const target = evt.target as HTMLInputElement;
                            console.log("VALUE", target.value);

                            if (target.value) {
                                debounce(async function () {
                                    console.log("searching");

                                    const results = await searchProducts(
                                        target.value
                                    );
                                    if (results.success) {
                                        console.log("RESULTS", results);

                                        dispatch(
                                            setSearch({
                                                ...search,

                                                term: target.value,
                                                results: results.data,
                                            })
                                        );
                                    }
                                }, 500)();
                            } else {
                                console.log("cleaning", target.value);

                                dispatch(resetResults());
                                console.log(search);
                            }
                        }}
                    />
                </div>
                <ul className={styles["results-list"]}>
                    {search.opened &&
                        !search.term &&
                        !search.results &&
                        [1, 2, 3, 4].map((item) => {
                            return (
                                <SkeletonPlaceholderComponent
                                    key={item}
                                    color="transparent"
                                    className={
                                        styles["custom-skeleton-container"]
                                    }
                                    /*   meassures={{
                                        height: "4rem",
                                        width: "100%",
                                    }} */
                                    variant="rounded"
                                    animation="wave"
                                    afterEffect="linear-gradient( 90deg, transparent, rgba(181, 119, 44, 0.1), transparent)"
                                />
                            );
                        })}
                    {search.opened &&
                        search.results &&
                        search.term &&
                        search.results.length > 0 &&
                        search.results.map((result) => {
                            return (
                                <li
                                    className={`${
                                        styles["custom-skeleton-container"]
                                    } ${styles["result-item"]} ${
                                        search.selectedResult === result
                                            ? ` ${styles["active-result"]}`
                                            : ""
                                    }`}
                                    key={result.productSlug}
                                    onClick={() => {
                                        dispatch(
                                            setSearch({
                                                ...search,
                                                selectedResult: result,
                                            })
                                        );
                                    }}
                                >
                                    {result.title.length < 30 && search.term
                                        ? parseResultsText(
                                              result.title,
                                              search.term
                                          )
                                        : search.term
                                        ? `${parseResultsText(
                                              result.title.slice(0, 30),
                                              search.term
                                          )}...`
                                        : ""}
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div className={styles["right-column"]}>
                <div className={styles["column-overlay"]}></div>
                {search.selectedResult && (
                    <ProjectPrevisualizationComponent
                        project={search.selectedResult}
                    />
                )}
            </div>
        </div>
    );
};
