"use client";
import styles from "@/components/HomeVideoSectionComponent/HomeVideoSectionComponent.module.scss";
import { ReusableButtonContainer } from "@/containers/ReusableButtonContainer/ReusableButtonContainer";
import { useAppSelector } from "@/redux/store";
import { SvgIcon } from "@mui/material";
import { IndicatorComponent } from "../IndicatorComponent/IndicatorComponent";

export const HomeVideoSectionComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const videoSection =
        siteTexts && siteTexts.messages && siteTexts.messages.home.videoSection;
    return (
        <div className={styles["video-section-container"]}>
            <div className={styles["video-section-background"]}></div>
            <div className={styles["left-column"]}>
                <p className={styles["left-column-text"]}>
                    {videoSection &&
                        (() => {
                            const text = videoSection.textContent.text;
                            const parts = text.split("|");
                            return parts.map((part: string, index: number) => {
                                console.log(
                                    "PART",
                                    part,
                                    part.startsWith("<b>")
                                );

                                return part.startsWith("<b>") ||
                                    part.endsWith("</b>") ? (
                                    <strong key={`${index}`}>
                                        {part
                                            .replaceAll("<b>", "")
                                            .replaceAll("</b>", "")}
                                    </strong>
                                ) : (
                                    <p key={`${index}`}>{part}</p>
                                );
                            });
                        })()}
                </p>
                <div className={styles["left-column-indicators"]}>
                    {videoSection &&
                        Object.keys(videoSection.indicators).map(
                            (indicatorKey: string, index: number) => {
                                return (
                                    <IndicatorComponent
                                        key={indicatorKey}
                                        indicatorData={
                                            videoSection.indicators[
                                                indicatorKey
                                            ]
                                        }
                                    />
                                );
                            }
                        )}
                </div>
                <ReusableButtonContainer
                    text={`${videoSection && videoSection.button.text}`}
                    onClickHandler={`${
                        videoSection && videoSection.button.link
                    }`}
                    styleVariants={["dark"]}
                >
                    <SvgIcon
                        sx={{ minWidth: "2.5rem", fontWeight: "3rem" }}
                        viewBox="0 0 50 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Icons">
                            <path
                                id="Icon/Arrow"
                                d="M9 10.75C8.30964 10.75 7.75 11.3096 7.75 12C7.75 12.6904 8.30964 13.25 9 13.25V10.75ZM40.8839 12.8839C41.372 12.3957 41.372 11.6043 40.8839 11.1161L32.9289 3.16117C32.4408 2.67301 31.6493 2.67301 31.1612 3.16117C30.673 3.64932 30.673 4.44078 31.1612 4.92893L38.2322 12L31.1612 19.0711C30.673 19.5592 30.673 20.3507 31.1612 20.8388C31.6493 21.327 32.4408 21.327 32.9289 20.8388L40.8839 12.8839ZM9 13.25H40V10.75H9V13.25Z"
                                fill="#B3762B"
                            />
                        </g>
                    </SvgIcon>
                </ReusableButtonContainer>
            </div>
            <div className={styles["right-column"]}></div>
        </div>
    );
};
