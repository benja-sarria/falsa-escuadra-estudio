import styles from "@/components/HamburguerToCrossComponent/HamburguerToCrossComponent.module.scss";

export const HamburguerToCrossComponent = ({ opened }: { opened: boolean }) => {
    return (
        <div className={`${styles["nav-icon-container"]}`}>
            <div
                id="hamburguer-icon"
                className={`${styles["nav-icon"]}${
                    opened ? ` ${styles["open"]}` : ""
                }`}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};
