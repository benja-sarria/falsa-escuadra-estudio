"use client";

import styles from "@/components/NavbarComponent/NavbarComponent.module.scss";
import { AnimatedNavbarLogoComponent } from "../AnimatedNavbarLogoComponent/AnimatedNavbarLogoComponent";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";

export const DesktopNavbar = ({
    children,
}: {
    children: ReactNode | ReactNode[];
}) => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);

    const router = useRouter();
    const [navbarTexts, setNavbarTexts] = useState<undefined | any>(undefined);
    useEffect(() => {
        if (siteTexts.messages) {
            setNavbarTexts(siteTexts.messages.layout.navbar);
        }
    }, [siteTexts]);

    return (
        <>
            <div className={styles["navbar-logo-container"]}>
                <AnimatedNavbarLogoComponent
                    animatedId="navbar"
                    variants={["dark"]}
                    onClick={() => {
                        router.push("/");
                    }}
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
            <div className={styles["navbar-searchbox-container"]}>
                {children}
            </div>
        </>
    );
};
