"use client";
import styles from "@/components/NavbarComponent/NavbarComponent.module.scss";
import Link from "next/link";
import { AnimatedNavbarLogoComponent } from "../AnimatedNavbarLogoComponent/AnimatedNavbarLogoComponent";
import { useAppSelector } from "@/redux/store";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBoxContainer } from "@/containers/SearchBoxContainer/SearchBoxContainer";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

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
            if (
                window.innerWidth > 768 &&
                y > window.scrollY &&
                navBarRef.current
            ) {
                (navBarRef.current as HTMLElement).classList.remove(
                    styles["hide-all-navigation"]
                );
            } else if (
                window.innerWidth > 768 &&
                y < window.scrollY &&
                navBarRef.current
            ) {
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
            {window.innerWidth > 768 ? (
                <DesktopNavbar>{children}</DesktopNavbar>
            ) : (
                <MobileNavbar>{children}</MobileNavbar>
            )}
        </div>
    );
};
