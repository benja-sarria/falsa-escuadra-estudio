import { animate, motion } from "framer-motion";

export const openAnimation = ({
    animatedId: animatedId,
    setFalsaAnimation: setFalsaAnimation,
    setEscuadraAnimation: setEscuadraAnimation,
    setEstudioAnimation: setEstudioAnimation,
}: {
    animatedId: string;
    setFalsaAnimation: Function;
    setEscuadraAnimation: Function;
    setEstudioAnimation: Function;
}) => {
    console.log(["ANIMATION-ENTER"]);

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
};

export const closeAnimation = ({
    animatedId,
    falsaAnimation,
    escuadraAnimation,
    estudioAnimation,
}: {
    animatedId: string;
    falsaAnimation: any;
    escuadraAnimation: any;
    estudioAnimation: any;
}) => {
    setTimeout(() => {
        console.log(["ANIMATION-EXIT"]);

        falsaAnimation && falsaAnimation.cancel();
        escuadraAnimation && escuadraAnimation.cancel();
        estudioAnimation && estudioAnimation.cancel();
        animate(
            `#${animatedId}-component-container`,
            {
                minWidth: "calc(var(--logo-min-width) * 1.1)",
                maxWidth: "calc(var(--logo-min-width) * 1.1)",
                overflow: "invisible",
            },
            { delay: 0.4 }
        );
        animate(`#${animatedId}-logo-inner-container`, {
            rotate: -360,
        });
        animate(
            `#${animatedId}-falsa-inner-container`,
            {
                left: "unset",
            },
            {
                type: "spring",
                stiffness: 100,
                onPlay: () => {
                    setTimeout(() => {
                        animate(
                            `#${animatedId}-falsa-inner-container`,
                            {
                                opacity: 0,
                            },
                            {
                                type: "spring",
                                stiffness: 100,
                            }
                        );
                    }, 20);
                },
            }
        );
        animate(
            `#${animatedId}-escuadra-inner-container`,
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
                            `#${animatedId}-escuadra-inner-container`,
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
            `#${animatedId}-estudio-inner-container`,
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
                            `#${animatedId}-estudio-inner-container`,
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
};
