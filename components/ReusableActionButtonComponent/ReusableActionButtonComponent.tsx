import styles from "@/components/ReusableActionButtonComponent/ReusableActionButtonComponent.module.scss";
import { setAdminDetailOpened } from "@/redux/features/admin-detail-open";
import { setOpenedProduct } from "@/redux/features/admin-opened-product-slice";
import { AppDispatch } from "@/redux/store";
import {
    AvailableProductActionsType,
    ProductReceivedType,
} from "@/types/projectTypes";
import { parseVariants } from "@/utils/styles/parseVariants";
import { MouseEventHandler, ReactNode } from "react";
import { useDispatch } from "react-redux";

export const ReusableActionButtonComponent = ({
    icon,
    text,
    action,
    styleVariants,
    execute,
}: {
    icon: ReactNode;
    text: string;
    action: AvailableProductActionsType;
    styleVariants?: string[];
    execute: MouseEventHandler;
}) => {
    return (
        <button
            className={`${styles["action-button-container"]}${
                styleVariants && styleVariants.length > 0
                    ? parseVariants(styleVariants, styles)
                    : ""
            }`}
            onClick={execute}
            data-action={`${action}`}
        >
            {icon}
            <h5>{text}</h5>
        </button>
    );
};
