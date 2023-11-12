"use client";
import styles from "@/components/NavbarComponent/NavbarComponent.module.scss";
import Link from "next/link";
import { AnimatedNavbarLogoComponent } from "../AnimatedNavbarLogoComponent/AnimatedNavbarLogoComponent";
import { useAppSelector } from "@/redux/store";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBoxContainer } from "@/containers/SearchBoxContainer/SearchBoxContainer";

export const NavbarComponent = ({ children }: { children: ReactNode }) => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const [navbarTexts, setNavbarTexts] = useState<undefined | any>(undefined);
    const [y, setY] = useState(0);
    const navBarRef = useRef(null);
    const navBarBackgroundRef = useRef(null);
    const router = useRouter();
    useEffect(() => {
        if (siteTexts.messages) {
            setNavbarTexts(siteTexts.messages.layout.navbar);
        }
    }, [siteTexts]);

    useEffect(() => {
        const navbarScrollHandler = (e: any) => {
            const window = e.currentTarget;
            if (y > window.scrollY && navBarRef.current) {
                (navBarRef.current as HTMLElement).classList.remove(
                    styles["hide-all-navigation"]
                );
            } else if (y < window.scrollY && navBarRef.current) {
                (navBarRef.current as HTMLElement).classList.add(
                    styles["hide-all-navigation"]
                );
            }
            if (
                window.scrollY > 50 &&
                navBarBackgroundRef.current &&
                !(
                    navBarBackgroundRef.current as HTMLElement
                ).classList.contains(styles["scrolled-navbar"])
            ) {
                (navBarBackgroundRef.current as HTMLElement).classList.add(
                    styles["scrolled-navbar"]
                );
            } else if (window.scrollY < 50 && navBarBackgroundRef.current) {
                (navBarBackgroundRef.current as HTMLElement).classList.remove(
                    styles["scrolled-navbar"]
                );
            }
            setY(window.scrollY);
        };

        window.addEventListener("scroll", navbarScrollHandler);

        return () => {
            window.removeEventListener("scroll", navbarScrollHandler);
        };
    }, [y]);

    console.log("[NAVBAR-TEXTS]", siteTexts);

    return (
        <div className={styles["navbar-container"]} ref={navBarRef}>
            <div
                className={styles["navbar-background"]}
                ref={navBarBackgroundRef}
            ></div>
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
        </div>
    );
};
