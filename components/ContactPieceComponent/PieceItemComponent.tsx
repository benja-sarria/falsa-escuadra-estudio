import styles from "@/components/ContactPieceComponent/PieceItemComponent.module.scss";

const namespace = "piece-item-component";

export const PieceItemComponent = ({
    piece,
}: {
    piece: { value: string; label: string };
}) => {
    const { value, label } = piece;
    return (
        <div className={styles[namespace]}>
            <p className={styles[`${namespace}__label`]}>{label}</p>
            <strong className={styles[`${namespace}__value`]}>{value}</strong>
        </div>
    );
};
