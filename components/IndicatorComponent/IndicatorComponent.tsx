import styles from "@/components/IndicatorComponent/IndicatorComponent.module.scss";

export const IndicatorComponent = ({
    indicatorData,
}: {
    indicatorData: { number: string; subtitle: string };
}) => {
    return (
        <div className={styles["indicator-container"]}>
            <h3>
                {indicatorData.number}
                <span>+</span>
            </h3>
            <p>{indicatorData.subtitle}</p>
        </div>
    );
};
