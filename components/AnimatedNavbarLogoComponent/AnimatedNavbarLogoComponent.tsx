"use client";
import { animate, motion } from "framer-motion";
import Link from "next/link";
import styles from "./AnimatedNavbarLogoComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { parseVariants } from "@/utils/styles/parseVariants";
import { MouseEventHandler, useEffect, useState } from "react";
import { closeAnimation, openAnimation } from "@/utils/animations/logo";

export const AnimatedNavbarLogoComponent = ({
    animatedId,
    variants,
    onClick,
    openedState,
}: {
    variants?: string[];
    onClick?: MouseEventHandler;
    animatedId: string;
    openedState?: boolean;
}) => {
    const [falsaAnimation, setFalsaAnimation] = useState<any>(undefined);
    const [escuadraAnimation, setEscuadraAnimation] = useState<any>(undefined);
    const [estudioAnimation, setEstudioAnimation] = useState<any>(undefined);
    const [screenWidth, setScreenWidth] = useState<number>(1240);

    useEffect(() => {}, [falsaAnimation, escuadraAnimation, estudioAnimation]);

    useEffect(() => {
        if (openedState) {
            animate(`#${animatedId}-component-container`, {
                minWidth: "calc(var(--logo-min-width) * 4)",
                maxWidth: "calc(var(--logo-min-width) * 4)",
                overflow: "invisible",
            });

            animate(`#${animatedId}-logo-inner-container`, {
                rotate: 360,
            });

            const falsaAnimation = animate(
                `#${animatedId}-falsa-inner-container`,
                {
                    left: "90%",
                },
                {
                    type: "spring",
                    stiffness: 100,
                    onPlay: () => {
                        animate(`#${animatedId}-falsa-inner-container`, {
                            left: "0%",
                        });
                        setTimeout(() => {
                            animate(
                                `#${animatedId}-falsa-inner-container`,
                                {
                                    opacity: 1,
                                },
                                { type: "spring", stiffness: 100 }
                            );
                        }, 100);
                    },
                }
            );
            setFalsaAnimation(falsaAnimation);

            const escuadraAnimation = animate(
                `#${animatedId}-escuadra-inner-container`,
                {
                    left: "90%",
                },
                {
                    delay: 0.095,
                    type: "spring",
                    stiffness: 100,
                    onPlay: () => {
                        animate(`#${animatedId}-escuadra-inner-container`, {
                            left: "0%",
                        });
                        setTimeout(() => {
                            animate(
                                `#${animatedId}-escuadra-inner-container`,
                                {
                                    opacity: 1,
                                },
                                {
                                    delay: 0.095,
                                    type: "spring",
                                    stiffness: 100,
                                }
                            );
                        }, 100);
                    },
                }
            );
            setEscuadraAnimation(escuadraAnimation);
            const estudioAnimation = animate(
                `#${animatedId}-estudio-inner-container`,
                {
                    left: "125%" /*  "90%" */,
                },
                {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100,
                    onPlay: () => {
                        animate(`#${animatedId}-estudio-inner-container`, {
                            left: "0%",
                        });
                        setTimeout(() => {
                            animate(
                                `#${animatedId}-estudio-inner-container`,
                                {
                                    opacity: 1,
                                },
                                {
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 100,
                                }
                            );
                        }, 100);
                    },
                }
            );
            setEstudioAnimation(estudioAnimation);
        }
    }, [openedState]);
    useEffect(() => {
        if (screen) {
            setScreenWidth(screen.availWidth);
        }
    }, []);
    return (
        <motion.div
            className={styles["outer-container"]}
            onHoverStart={
                !openedState && screenWidth > 768
                    ? () => {
                          openAnimation({
                              animatedId,
                              setFalsaAnimation,
                              setEscuadraAnimation,
                              setEstudioAnimation,
                          });
                      }
                    : () => {}
            }
            onHoverEnd={
                !openedState && screenWidth > 768
                    ? () => {
                          closeAnimation({
                              animatedId,
                              falsaAnimation,
                              escuadraAnimation,
                              estudioAnimation,
                          });
                      }
                    : () => {}
            }
            onTouchStart={
                !openedState
                    ? () => {
                          openAnimation({
                              animatedId,
                              setFalsaAnimation,
                              setEscuadraAnimation,
                              setEstudioAnimation,
                          });
                      }
                    : () => {}
            }
            onTouchEnd={
                !openedState
                    ? () => {
                          setTimeout(() => {
                              closeAnimation({
                                  animatedId,
                                  falsaAnimation,
                                  escuadraAnimation,
                                  estudioAnimation,
                              });
                          }, 800);
                      }
                    : () => {}
            }
        >
            <motion.div
                className={`${styles["component-container"]}${
                    variants && variants.length > 0
                        ? parseVariants(variants, styles)
                        : ""
                }`}
                id={`${animatedId}-component-container`}
            >
                <Link href={"/"}>
                    <AutoAdjustImgComponent
                        alt="falsa escuadra logo"
                        givenClassName={styles["logo-inner-container"]}
                        src="/assets/img/icons/falsa-escuadra-logo.svg"
                        calculate="height"
                        fixedParameter="--logo-min-width"
                        id={`${animatedId}-logo-inner-container`}
                    />
                    <div className={styles["letters-container"]}>
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={`${styles["letter-inner-container"]} ${styles["falsa-inner-container"]}`}
                            src="/assets/img/icons/Falsa.svg"
                            calculate="height"
                            fixedParameter="--logo-falsa-width"
                            id={`${animatedId}-falsa-inner-container`}
                        />
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={`${styles["letter-inner-container"]} ${styles["escuadra-inner-container"]}`}
                            src="/assets/img/icons/Escuadra.svg"
                            calculate="height"
                            fixedParameter="--logo-escuadra-width"
                            id={`${animatedId}-escuadra-inner-container`}
                        />
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={`${styles["letter-inner-container"]} ${styles["estudio-inner-container"]}`}
                            src="/assets/img/icons/Estudio.svg"
                            calculate="height"
                            fixedParameter="--logo-estudio-width"
                            id={`${animatedId}-estudio-inner-container`}
                        />
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};
