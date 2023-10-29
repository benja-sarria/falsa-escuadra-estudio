"use client";
import styles from "@/components/NavbarComponent/NavbarComponent.module.scss";
import Link from "next/link";
import { AnimatedNavbarLogoComponent } from "../AnimatedNavbarLogoComponent/AnimatedNavbarLogoComponent";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const NavbarComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const [navbarTexts, setNavbarTexts] = useState<undefined | any>(undefined);
    const router = useRouter();
    useEffect(() => {
        if (siteTexts.messages) {
            setNavbarTexts(siteTexts.messages.layout.navbar);
        }
    }, [siteTexts]);

    console.log("[NAVBAR-TEXTS]", siteTexts);

    return (
        <div className={styles["navbar-container"]}>
            <div>
                <AnimatedNavbarLogoComponent
                    variants={["dark"]}
                    onClick={() => {
                        router.push("/");
                    }}
                />
            </div>
            <div>
                {navbarTexts &&
                    Object.keys(navbarTexts).map((linkKey) => {
                        return (
                            <Link
                                key={linkKey}
                                href={navbarTexts[linkKey].link}
                            >
                                <p>{navbarTexts[linkKey].text}</p>
                            </Link>
                        );
                    })}
            </div>
            <div></div>
        </div>
    );
};
