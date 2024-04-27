"use client";
import styles from "@/components/HomeVideoSectionComponent/HomeVideoSectionComponent.module.scss";
import { ReusableButtonContainer } from "@/containers/ReusableButtonContainer/ReusableButtonContainer";
import { useAppSelector } from "@/redux/store";
import { SvgIcon } from "@mui/material";
import { IndicatorComponent } from "../IndicatorComponent/IndicatorComponent";
import { parseTags } from "@/utils/text/parseTags";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const HomeVideoSectionComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const videoSection =
        siteTexts && siteTexts.messages && siteTexts.messages.home.videoSection;
    return (
        <div className={styles["video-section-container"]}>
            <div className={styles["video-section-background"]}></div>
            <div className={styles["left-column"]}>
                <div className={styles["left-column-text"]}>
                    {videoSection && parseTags(videoSection.textContent.text)}
                </div>
                <div className={styles["left-column-indicators"]}>
                    {videoSection &&
                        Object.keys(videoSection.indicators).map(
                            (indicatorKey: string, index: number) => {
                                return (
                                    <IndicatorComponent
                                        key={indicatorKey}
                                        indicatorData={
                                            videoSection.indicators[
                                                indicatorKey as keyof typeof videoSection.indicators
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
            <div className={styles["right-column"]}>
                <AutoAdjustImgComponent
                    src={`/assets/img/home/working.webp`}
                    alt={`work in progress`}
                    givenClassName={styles["product-img-inner-container"]}
                    calculate="height"
                    fixedParameter={"--min-width"}
                />
                {/*  <iframe
                    className={styles["right-column-video"]}
                    src="https://video.fluq5-1.fna.fbcdn.net/v/t42.1790-2/243038183_292697318996259_9069813821112399010_n.mp4?_nc_cat=103&ccb=1-7&_nc_sid=55d0d3&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=_ozULHiCS1AAX9ws7iK&_nc_rml=0&_nc_ht=video.fluq5-1.fna&oh=00_AfDYst8fnOp5vjqqK4vYa8BmMvJdUKtxccnpzbg-gH1ZKA&oe=65430CF3"
                /> */}
            </div>
        </div>
    );
};
