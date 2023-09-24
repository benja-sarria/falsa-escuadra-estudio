import styles from "@/components/ReusableActionButtonComponent/ReusableActionButtonComponent.module.scss";
import { AvailableProductActionsType } from "@/types/projectTypes";
import { ReactNode } from "react";

export const ReusableActionButtonComponent = ({
    icon,
    text,
    action,
}: {
    icon: ReactNode;
    text: string;
    action: AvailableProductActionsType;
}) => {
    const availableActions = {
        edit: () => {},
        remove: () => {},
    };
    return (
        <button
            className={styles["action-button-container"]}
            onClick={availableActions[action]}
        >
            {icon}
            <h5>{text}</h5>
        </button>
    );
};
