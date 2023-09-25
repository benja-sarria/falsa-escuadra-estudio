"use client";

import styles from "@/components/AdminFrameComponent/AdminFrameComponent.module.scss";

import { motion, useAnimationControls } from "framer-motion";

import { AvailableSectionsType } from "@/redux/features/admin-slice";
import { ReactNode, useEffect, useRef, useState } from "react";

export const AdminFrameComponent = ({
    children,
    section,
    open,
}: {
    children: ReactNode;
    section: AvailableSectionsType;
    open: Boolean;
}) => {
    const options: { [id in AvailableSectionsType]: string } = {
        dashboard: "Inicio",
        products: "Productos",
        profile: "Perfil",
        users: "Usuarios",
    };
    const [screenState, setScreenState] = useState<undefined | any>(undefined);
    const title = useRef(null);
    const svg = useRef(null);
    const controls = useAnimationControls();
    useEffect(() => {
        console.log("[ITEM]", title.current);

        if (title.current && svg.current) {
            (title.current as any).classList.add(`${styles["animate-title"]}`);
            controls.set("hidden");
            (svg.current as any).classList.add(`${styles["animation-tilt"]}`);
            controls.start("visible");
            setTimeout(() => {
                (title.current as any).classList.remove(
                    `${styles["animate-title"]}`
                );
            }, 300);
            setTimeout(() => {
                (svg.current as any).classList.remove(
                    `${styles["animation-tilt"]}`
                );
            }, 1000);
        }
    }, [section]);

    useEffect(() => {
        setTimeout(() => {
            const handleSetScreen = () => {
                console.log("SETTING-screen");

                setScreenState(screen);
            };
            handleSetScreen();
        }, 600);
    }, []);
    useEffect(() => {}, [screenState]);

    const icon = {
        hidden: {
            pathLength: 0,
            strokeWidht: "2",
        },
        visible: {
            pathLength: 1,
            strokeWidht: "2",
        },
    };

    return (
        <div className={styles["frame-container"]}>
            <h2 ref={title} className={styles["frame-title"]}>
                {options[section]}
            </h2>
            <svg
                width={`${screenState ? screenState?.width * 1 : 100}`}
                height={`${screenState ? screenState?.height * 1 : 100}`}
                style={{
                    position: "absolute",
                    left: "-4.9rem",
                    top: "-6.5rem",
                }}
                className={styles["animation-tilt"]}
                ref={svg}
                viewBox={`0 0 ${screenState ? screenState?.width * 0.9 : 100} ${
                    screenState ? screenState?.height * 0.9 : 100
                }`}
            >
                <motion.path
                    d={`M100,100 h${
                        open && screenState
                            ? screenState?.width * 0.62
                            : screenState?.width * 0.72
                    } a30,30 0 0 1 20,20 v${
                        screenState ? screenState?.height * 0.52 : 100
                    }  a30,30 0 0 1 -20,20 h-${
                        open && screenState
                            ? screenState?.width * 0.62
                            : screenState?.width * 0.72
                    } a30,30 0 0 1 -20,-20 v-${
                        screenState ? screenState?.height * 0.52 : 100
                    } a30,30 0 0 1 20,-20 z`}
                    stroke="white"
                    fill={"transparent"}
                    stroke-width="2"
                    variants={icon}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 1 }}
                />
            </svg>
            <div className={styles["frame-content"]}>{children}</div>
        </div>
    );
};
