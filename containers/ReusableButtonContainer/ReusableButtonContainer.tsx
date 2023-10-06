"use client";
import { ReusableButtonComponent } from "@/components/ReusableButtonComponent/ReusableButtonComponent";
import { signIn } from "next-auth/react";
import { SyntheticEvent } from "react";

export const ReusableButtonContainer = ({
    text,
    onClickHandler,
    styleVariants,
}: {
    text: string;
    onClickHandler: keyof typeof actions;
    styleVariants: string[];
}) => {
    const actions = {
        "log-in": (evt: SyntheticEvent) => {
            console.log("[CLICKED]", evt);
            signIn("google", {
                redirect: false,
            });
        },
    };
    return (
        <ReusableButtonComponent
            text={text}
            onClickHandler={actions[onClickHandler]}
            styleVariants={styleVariants}
        />
    );
};
