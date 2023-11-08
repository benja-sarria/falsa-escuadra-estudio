"use client";
import { animate, motion } from "framer-motion";
import Link from "next/link";
import styles from "./AnimatedNavbarLogoComponent.module.scss";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { parseVariants } from "@/utils/styles/parseVariants";
import { MouseEventHandler, useEffect, useState } from "react";

export const AnimatedNavbarLogoComponent = ({
    variants,
    onClick,
}: {
    variants?: string[];
    onClick?: MouseEventHandler;
}) => {
    const [falsaAnimation, setFalsaAnimation] = useState<any>(undefined);
    const [escuadraAnimation, setEscuadraAnimation] = useState<any>(undefined);
    const [estudioAnimation, setEstudioAnimation] = useState<any>(undefined);

    useEffect(() => {}, [falsaAnimation, escuadraAnimation, estudioAnimation]);

    return (
        <motion.div
            className={styles["outer-container"]}
            onHoverStart={() => {
                console.log(["ANIMATION-ENTER"]);

                animate(`.${styles["component-container"]}`, {
                    minWidth: "calc(var(--logo-min-width) * 4)",
                    maxWidth: "calc(var(--logo-min-width) * 4)",
                    overflow: "invisible",
                });

                animate(`.${styles["logo-inner-container"]}`, {
                    rotate: 360,
                });

                const falsaAnimation = animate(
                    `.${styles["falsa-inner-container"]}`,
                    {
                        left: "90%",
                    },
                    {
                        type: "spring",
                        stiffness: 100,
                        onPlay: () => {
                            animate(`.${styles["falsa-inner-container"]}`, {
                                left: "0%",
                            });
                            setTimeout(() => {
                                animate(
                                    `.${styles["falsa-inner-container"]}`,
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
                    `.${styles["escuadra-inner-container"]}`,
                    {
                        left: "90%",
                    },
                    {
                        delay: 0.095,
                        type: "spring",
                        stiffness: 100,
                        onPlay: () => {
                            animate(`.${styles["escuadra-inner-container"]}`, {
                                left: "0%",
                            });
                            setTimeout(() => {
                                animate(
                                    `.${styles["escuadra-inner-container"]}`,
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
                    `.${styles["estudio-inner-container"]}`,
                    {
                        left: "125%" /*  "90%" */,
                    },
                    {
                        delay: 0.2,
                        type: "spring",
                        stiffness: 100,
                        onPlay: () => {
                            animate(`.${styles["estudio-inner-container"]}`, {
                                left: "0%",
                            });
                            setTimeout(() => {
                                animate(
                                    `.${styles["estudio-inner-container"]}`,
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
            }}
            onHoverEnd={() => {
                setTimeout(() => {
                    console.log(["ANIMATION-EXIT"]);

                    falsaAnimation && falsaAnimation.cancel();
                    escuadraAnimation && escuadraAnimation.cancel();
                    estudioAnimation && estudioAnimation.cancel();
                    animate(
                        `.${styles["component-container"]}`,
                        {
                            minWidth: "calc(var(--logo-min-width) * 1.1)",
                            maxWidth: "calc(var(--logo-min-width) * 1.1)",
                            overflow: "invisible",
                        },
                        { delay: 0.4 }
                    );
                    animate(`.${styles["logo-inner-container"]}`, {
                        rotate: -360,
                    });
                    animate(
                        `.${styles["falsa-inner-container"]}`,
                        {
                            left: "unset",
                        },
                        {
                            type: "spring",
                            stiffness: 100,
                            onPlay: () => {
                                setTimeout(() => {
                                    animate(
                                        `.${styles["falsa-inner-container"]}`,
                                        {
                                            opacity: 0,
                                        },
                                        { type: "spring", stiffness: 100 }
                                    );
                                }, 20);
                            },
                        }
                    );
                    animate(
                        `.${styles["escuadra-inner-container"]}`,
                        {
                            left: "unset",
                        },
                        {
                            delay: 0.1,
                            type: "spring",
                            stiffness: 100,
                            onPlay: () => {
                                setTimeout(() => {
                                    animate(
                                        `.${styles["escuadra-inner-container"]}`,
                                        {
                                            opacity: 0,
                                        },
                                        {
                                            delay: 0.1,
                                            type: "spring",
                                            stiffness: 100,
                                        }
                                    );
                                }, 20);
                            },
                        }
                    );
                    animate(
                        `.${styles["estudio-inner-container"]}`,
                        {
                            left: "unset",
                        },
                        {
                            delay: 0.2,
                            type: "spring",
                            stiffness: 100,
                            onPlay: () => {
                                setTimeout(() => {
                                    animate(
                                        `.${styles["estudio-inner-container"]}`,
                                        {
                                            opacity: 0,
                                        },
                                        {
                                            delay: 0.2,
                                            type: "spring",
                                            stiffness: 100,
                                        }
                                    );
                                }, 20);
                            },
                        }
                    );
                }, 100);
            }}
        >
            <motion.div
                className={`${styles["component-container"]}${
                    variants && variants.length > 0
                        ? parseVariants(variants, styles)
                        : ""
                }`}
            >
                <Link href={"/"}>
                    <AutoAdjustImgComponent
                        alt="falsa escuadra logo"
                        givenClassName={styles["logo-inner-container"]}
                        src="/assets/img/icons/falsa-escuadra-logo.svg"
                        calculate="height"
                        fixedParameter="--logo-min-width"
                    />
                    <div className={styles["letters-container"]}>
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={`${styles["letter-inner-container"]} ${styles["falsa-inner-container"]}`}
                            src="/assets/img/icons/Falsa.svg"
                            calculate="height"
                            fixedParameter="--logo-falsa-width"
                        />
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={`${styles["letter-inner-container"]} ${styles["escuadra-inner-container"]}`}
                            src="/assets/img/icons/Escuadra.svg"
                            calculate="height"
                            fixedParameter="--logo-escuadra-width"
                        />
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={`${styles["letter-inner-container"]} ${styles["estudio-inner-container"]}`}
                            src="/assets/img/icons/Estudio.svg"
                            calculate="height"
                            fixedParameter="--logo-estudio-width"
                        />
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};
