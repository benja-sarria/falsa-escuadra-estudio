"use client";
import { ReusableButtonComponent } from "@/components/ReusableButtonComponent/ReusableButtonComponent";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, SyntheticEvent } from "react";

export const ReusableButtonContainer = ({
    text,
    onClickHandler,
    styleVariants,
    children,
}: {
    text: string;
    onClickHandler: keyof typeof actions | any;
    styleVariants: string[];
    children?: ReactNode;
}) => {
    const router = useRouter();
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
            onClickHandler={
                actions[onClickHandler as keyof typeof actions]
                    ? actions[onClickHandler as keyof typeof actions]
                    : () => {
                          router.push(onClickHandler);
                      }
            }
            styleVariants={styleVariants}
        >
            {children}
        </ReusableButtonComponent>
    );
};
