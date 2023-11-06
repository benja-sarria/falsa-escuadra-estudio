import styles from "@/components/SearchBoxComponent/SearchBoxComponent.module.scss";
import { SvgIcon } from "@mui/material";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const SearchBoxComponent = () => {
    return (
        <div className={styles["search-box-container"]}>
            <div>
                <button
                    aria-label="search"
                    className={styles["search-box-button"]}
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
