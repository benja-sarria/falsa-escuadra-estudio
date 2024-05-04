"use client";
import styles from "@/components/FooterComponent/FooterComponent.module.scss";
import { AnimatedNavbarLogoComponent } from "../AnimatedNavbarLogoComponent/AnimatedNavbarLogoComponent";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const FooterComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const socialMedia = siteTexts.messages?.socialMediaFooter;

    const [navbarTexts, setNavbarTexts] = useState<undefined | any>(undefined);
    useEffect(() => {
        if (siteTexts.messages) {
            setNavbarTexts(siteTexts.messages.layout.navbar);
        }
    }, [siteTexts]);
    return (
        <div className={styles["footer-container"]}>
            <div className={styles["footer-inner-container"]}>
                <div className={styles["footer-logo-container"]}>
                    <AnimatedNavbarLogoComponent
                        animatedId="footer"
                        variants={["light", "mid-size"]}
                        openedState
                    />
                </div>
                <div className={styles["navbar-navigation-container"]}>
                    {navbarTexts &&
                        Object.keys(navbarTexts).map((linkKey) => {
                            return (
                                <Link
                                    key={linkKey}
                                    href={navbarTexts[linkKey].link}
                                >
                                    <p>{navbarTexts[linkKey].text}</p>
                                    <strong>{navbarTexts[linkKey].text}</strong>
                                    <svg
                                        width="108"
                                        height="52"
                                        viewBox="0 0 108 52"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M73.7354 2.00783C56.6518 1.66549 8.07911 12.5601 2.55358 31.2779C-2.97194 49.9957 34.6871 49.7642 34.6871 49.7642C34.6871 49.7642 76.9895 52.3318 95.2934 40.5211C113.597 28.7103 105.876 14.0001 91.2258 9.19697C77.297 4.63026 53.8045 5.66943 44.0424 8.23698"
                                            stroke="#458374"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </Link>
                            );
                        })}
                </div>
                <div className={styles["social-container"]}>
                    {socialMedia &&
                        Object.keys(socialMedia).map((key) => {
                            const data =
                                socialMedia[key as keyof typeof socialMedia];
                            return (
                                <ReusableButtonComponent
                                    key={key}
                                    styleVariants={["social-media"]}
                                    icon={
                                        <AutoAdjustImgComponent
                                            alt={key}
                                            givenClassName={
                                                styles["inner-icon"]
                                            }
                                            src={data.icon}
                                            calculate="height"
                                            fixedParameter="--icon-min-width"
                                        />
                                    }
                                    onClickHandler={() => {
                                        const anchor =
                                            document.createElement("a");
                                        anchor.setAttribute("href", data.link);
                                        anchor.setAttribute("target", "_blank");
                                        anchor.click();
                                    }}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
