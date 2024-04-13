"use client";
import Image from "next/image";
import { EventHandler, useEffect, useRef } from "react";
import style from "./AutoAdjustImgComponent.module.scss";
import {
    caclulateHeightPropsWithoutLoader,
    caclulateWidthPropsWithoutLoader,
} from "@/utils/img/proportions";

interface AutoAdjustImgRequiredInterface {
    givenClassName: string;
    src: string;
    alt: string;
    id?: string;
    listenScreenChanges?: boolean;
    holdLogoUntilLoad?: boolean;
    priority?: boolean;
    quality?: number;
}
interface AutoAdjustImgCustomCallbackInterface {
    customCallback: Function;
    maxHeightParameter?: string;
    doNotEscalate?: boolean;
    fixedParameter?: string;
    calculate?: "height" | "width";
}
interface AutoAdjustImgDefaulInterface {
    fixedParameter: string;
    calculate: "height" | "width";
    customCallback?: any;
    maxHeightParameter?: string;
    doNotEscalate?: boolean;
}

export const AutoAdjustImgComponent = ({
    givenClassName,
    fixedParameter,
    maxHeightParameter,
    src,
    id,
    alt,
    calculate,
    customCallback,
    listenScreenChanges,
    holdLogoUntilLoad,
    doNotEscalate,
    priority,
    quality,
}: AutoAdjustImgRequiredInterface &
    (AutoAdjustImgCustomCallbackInterface | AutoAdjustImgDefaulInterface)) => {
    const image = useRef(null);
    const availableActions = {
        height: caclulateHeightPropsWithoutLoader,
        width: caclulateWidthPropsWithoutLoader,
    };

    const screenChangesCallback = () => {
        customCallback(image.current);
    };

    useEffect(() => {
        if (listenScreenChanges) {
            window.addEventListener("resize", screenChangesCallback);
            return () => {
                window.removeEventListener("resize", screenChangesCallback);
            };
        }
    }, []);

    return (
        <div
            className={`${style["container-minimums"]} ${givenClassName}`}
            id={id}
        >
            <Image
                src={src}
                alt={alt}
                quality={quality ? quality : 75}
                fill
                ref={image}
                onLoad={
                    customCallback
                        ? () => {
                              customCallback(
                                  image.current,
                                  `${fixedParameter}`,
                                  maxHeightParameter,
                                  doNotEscalate
                              );
                          }
                        : () => {
                              availableActions[
                                  `${calculate as "height" | "width"}`
                              ](
                                  image.current as unknown as HTMLImageElement,
                                  `${fixedParameter}`
                              );
                          }
                }
                priority={priority}
            />
        </div>
    );
};
