import styles from "@/components/FounderCoinComponent/FounderCoinComponent.module.scss";
import AddIcon from "@mui/icons-material/Add";

import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { ExtendedGetProfileType } from "@/types/profilesTypes";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";

export const FounderCoinComponent = ({
    profile,
}: {
    profile: ExtendedGetProfileType;
}) => {
    return (
        <>
            <div className={styles["founder-coin-container"]} key="front">
                <AutoAdjustImgComponent
                    alt={`${profile.user.name}`}
                    src={`${profile.photo}`}
                    givenClassName={styles["image-inner"]}
                    calculate="height"
                    fixedParameter="--image-min-width"
                />
            </div>
            {profile.signature && (
                <div
                    className={`${styles["founder-coin-container"]} ${styles["signature-coin"]}`}
                    key="back"
                >
                    <AutoAdjustImgComponent
                        alt={`${profile.user.name}`}
                        src={`${profile.signature}`}
                        givenClassName={styles["image-inner"]}
                        calculate="height"
                        fixedParameter="--image-min-width"
                    />
                    <ReusableButtonComponent
                        styleVariants={["coin-show-more"]}
                        icon={<AddIcon />}
                    />
                </div>
            )}
        </>
    );
};
