"use client";
import styles from "@/components/AboutUsHeroComponent/AboutUsHeroComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useAppSelector } from "@/redux/store";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import EastIcon from "@mui/icons-material/East";
import { useRouter } from "next/navigation";

export const AboutUsHeroComponent = () => {
    const globalTexts = useAppSelector((state) => state.globalLanguage.value);
    const heroTexts = globalTexts.messages?.aboutUs.footerHero;
    const router = useRouter();
    return (
        <div className={styles["container"]}>
            <div className={styles["title-section"]}>
                <p className={styles["pre-title"]}>{heroTexts?.preTitle}</p>
                <SectionTitleComponent
                    styleVariants={["about-us-hero"]}
                    text={heroTexts?.title}
                />
                <ReusableButtonComponent
                    styleVariants={["green-variant"]}
                    text={heroTexts?.button.text}
                    icon={<EastIcon />}
                    onClickHandler={() => {
                        heroTexts?.button.link &&
                            router.push(heroTexts?.button.link);
                    }}
                />
            </div>
            <AutoAdjustImgComponent
                alt={`${heroTexts?.alt}`}
                src={heroTexts?.src ? heroTexts.src : "/img.png"}
                givenClassName={styles["banner-img"]}
                calculate="height"
                fixedParameter="--banner-min-width"
            />
        </div>
    );
};
