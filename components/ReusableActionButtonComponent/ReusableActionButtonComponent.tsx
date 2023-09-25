import styles from "@/components/ReusableActionButtonComponent/ReusableActionButtonComponent.module.scss";
import { AvailableProductActionsType } from "@/types/projectTypes";
import { parseVariants } from "@/utils/styles/parseVariants";
import { ReactNode } from "react";

export const ReusableActionButtonComponent = ({
    icon,
    text,
    action,
    styleVariants,
}: {
    icon: ReactNode;
    text: string;
    action: AvailableProductActionsType;
    styleVariants?: string[];
}) => {
    const availableActions = {
        edit: () => {},
        remove: () => {},
    };
    return (
        <button
            className={`${styles["action-button-container"]}${
                styleVariants && styleVariants.length > 0
                    ? parseVariants(styleVariants, styles)
                    : ""
            }`}
            onClick={availableActions[action]}
            data-action={`${action}`}
        >
            {icon}
            <h5>{text}</h5>
        </button>
    );
};
