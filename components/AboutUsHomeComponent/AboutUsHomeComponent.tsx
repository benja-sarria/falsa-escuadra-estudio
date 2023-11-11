import styles from "@/components/AboutUsHomeComponent/AboutUsHomeComponent.module.scss";
import { FlipWrapperComponent } from "../FlipWrapperComponent/FlipWrapperComponent";

import { ExtendedGetProfileType } from "@/types/profilesTypes";
import { FounderCoinComponent } from "../FounderCoinComponent/FounderCoinComponent";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { AboutUsTitleComponent } from "../AboutUsTitleComponent/AboutUsTitleComponent";

export const AboutUsHomeComponent = ({
    profiles,
}: {
    profiles: ExtendedGetProfileType[];
}) => {
    if (!profiles) {
        return <></>;
    }
    return (
        <div className={styles["section-container"]}>
            <AboutUsTitleComponent />
            <div className={styles["photos-container"]}>
                {profiles &&
                    profiles.length > 0 &&
                    profiles.map((profile) => {
                        return (
                            <div key={profile.id}>
                                <FlipWrapperComponent
                                    width="var(--image-min-width)"
                                    height="var(--image-min-width)"
                                >
                                    <FounderCoinComponent profile={profile} />
                                </FlipWrapperComponent>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
