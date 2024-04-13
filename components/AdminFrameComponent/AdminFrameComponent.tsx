"use client";

import styles from "@/components/AdminFrameComponent/AdminFrameComponent.module.scss";

import { motion, useAnimationControls } from "framer-motion";

import { AvailableSectionsType } from "@/redux/features/admin-slice";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/redux/store";

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
    const openedDetail = useAppSelector(
        (state) => state.adminDetailOpened.value
    );
    const openedProduct = useAppSelector(
        (state) => state.openedProductValue.value
    );
    const [screenState, setScreenState] = useState<undefined | any>(undefined);
    const title = useRef(null);
    const svg = useRef(null);
    const controls = useAnimationControls();
    useEffect(() => {
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
                setScreenState(window);
            };
            handleSetScreen();
        }, 600);
    }, []);
    useEffect(() => {}, [screenState]);

    const icon = {
        hidden: {
            pathLength: 0,
            strokeWidth: "2",
        },
        visible: {
            pathLength: 1,
            strokeWidth: "2",
        },
    };

    return (
        <div className={styles["frame-container"]}>
            <h2 ref={title} className={styles["frame-title"]}>
                {openedDetail
                    ? openedProduct?.original?.title
                    : options[section]}
            </h2>
            <svg
                width={`${screenState ? screenState?.innerWidth * 1 : 100}`}
                height={`${screenState ? screenState?.innerHeight * 1 : 100}`}
                style={{
                    position: "absolute",
                    left: "-4.9rem",
                    top: "-6.5rem",
                    pointerEvents: "none",
                }}
                className={styles["animation-tilt"]}
                ref={svg}
                viewBox={`0 0 ${
                    screenState ? screenState?.innerWidth * 0.9 : 100
                } ${screenState ? screenState?.innerHeight * 0.9 : 100}`}
            >
                <motion.path
                    d={`M100,100 h${
                        open && screenState
                            ? screenState?.innerWidth * 0.8
                            : screenState?.innerWidth * 0.8
                    } a30,30 0 0 1 20,20 v${
                        screenState ? screenState?.innerHeight * 0.7 : 100
                    }  a30,30 0 0 1 -20,20 h-${
                        open && screenState
                            ? screenState?.innerWidth * 0.8
                            : screenState?.innerWidth * 0.8
                    } a30,30 0 0 1 -20,-20 v-${
                        screenState ? screenState?.innerHeight * 0.7 : 100
                    } a30,30 0 0 1 20,-20 z`}
                    stroke="white"
                    fill={"transparent"}
                    strokeWidth="2"
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
