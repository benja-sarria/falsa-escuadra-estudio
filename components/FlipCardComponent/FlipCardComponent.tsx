import type { ComponentType, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { debounce } from "@mui/material";
import { FlippedStateType } from "../ProcessGridComponent/ProcessGridComponent";

// Learn more: https://www.framer.com/docs/guides/overrides/

//Spring animation parameters
const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

/**
 * 3D Flip
 * Created By Joshua Guo
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export const FlipCardComponent = ({
    children,
    width,
    height,
    enableHover,
    externalHandler,
}: {
    children: ReactNode;
    width: number;
    height: number;
    enableHover: boolean;
    externalHandler: {
        handler: Function;
        key: string;
        state: FlippedStateType;
    };
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped((prevState) => !prevState);
    };

    const [rotateXaxis, setRotateXaxis] = useState(0);
    const [rotateYaxis, setRotateYaxis] = useState(0);
    const ref = useRef(null);

    const handleMouseMove = (event: any) => {
        const element = ref.current as any;
        const elementRect = element.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;
        const elementCenterX = elementWidth / 5;
        const elementCenterY = elementHeight / 5;
        const mouseX = event.clientY - elementRect.y - elementCenterY;
        const mouseY = event.clientX - elementRect.x - elementCenterX;
        const degreeX = (mouseX / elementWidth) * 20; //The number is the rotation factor
        const degreeY = (mouseY / elementHeight) * 20; //The number is the rotation factor
        setRotateXaxis(degreeX);
        setRotateYaxis(degreeY);
    };

    const handleMouseEnd = () => {
        setRotateXaxis(0);
        setRotateYaxis(0);
    };

    const dx = useSpring(0, spring);
    const dy = useSpring(0, spring);

    useEffect(() => {
        dx.set(rotateXaxis);
        dy.set(-rotateYaxis);
    }, [rotateXaxis, rotateYaxis]);

    return (
        <motion.div
            /* onClick={handleClick} */
            onMouseEnter={() => {
                if (
                    !externalHandler ||
                    (externalHandler.state &&
                        !externalHandler.state.hasOwnProperty(
                            externalHandler.key
                        ) &&
                        !isFlipped)
                ) {
                    handleClick();
                }
            }}
            onMouseLeave={() => {
                if (
                    !externalHandler ||
                    (externalHandler.state &&
                        !externalHandler.state.hasOwnProperty(
                            externalHandler.key
                        ) &&
                        isFlipped)
                ) {
                    handleClick();
                }
            }}
            transition={spring}
            style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
                width: `${width}`,
                height: `${height}`,
            }}
        >
            <motion.div
                ref={ref}
                whileHover={{ scale: 1.1 }} //Change the scale of zooming in when hovering
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseEnd}
                transition={spring}
                style={{
                    width: "100%",
                    height: "100%",
                    rotateX: dx,
                    rotateY: dy,
                }}
            >
                <div
                    style={{
                        perspective: "1200px",
                        transformStyle: "preserve-3d",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <motion.div
                        animate={{
                            rotateY:
                                !externalHandler ||
                                (externalHandler.state &&
                                    !externalHandler.state.hasOwnProperty(
                                        externalHandler.key
                                    ))
                                    ? isFlipped
                                        ? 180
                                        : 0
                                    : externalHandler.state[
                                          externalHandler.key as keyof typeof externalHandler.state
                                      ]
                                    ? 180
                                    : 0,
                        }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex:
                                !externalHandler ||
                                (externalHandler.state &&
                                    !externalHandler.state.hasOwnProperty(
                                        externalHandler.key
                                    ))
                                    ? isFlipped
                                        ? 0
                                        : 1
                                    : externalHandler.state[
                                          externalHandler.key as keyof typeof externalHandler.state
                                      ]
                                    ? 0
                                    : 1,
                            backfaceVisibility: "hidden",
                            position: "absolute",
                        }}
                    >
                        <div
                            style={{
                                minWidth: "20rem",
                                minHeight: "20rem",
                                backgroundColor: "red",
                            }}
                        ></div>
                    </motion.div>
                    <motion.div
                        initial={{ rotateY: 180 }}
                        animate={{
                            rotateY:
                                !externalHandler ||
                                (externalHandler.state &&
                                    !externalHandler.state.hasOwnProperty(
                                        externalHandler.key
                                    ))
                                    ? isFlipped
                                        ? 0
                                        : -180
                                    : externalHandler.state[
                                          externalHandler.key as keyof typeof externalHandler.state
                                      ]
                                    ? -180
                                    : 0,
                        }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex:
                                !externalHandler ||
                                (externalHandler.state &&
                                    !externalHandler.state.hasOwnProperty(
                                        externalHandler.key
                                    ))
                                    ? isFlipped
                                        ? 1
                                        : 0
                                    : externalHandler.state[
                                          externalHandler.key as keyof typeof externalHandler.state
                                      ]
                                    ? 1
                                    : 0,
                            backfaceVisibility: "hidden",
                            position: "absolute",
                        }}
                    >
                        {/*  {children}  */}
                        <div
                            style={{
                                minWidth: "20rem",
                                minHeight: "20rem",
                                backgroundColor: "blue",
                            }}
                        ></div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
