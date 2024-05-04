import styles from "@/components/ContactPieceComponent/PieceItemComponent.module.scss";

const namespace = "piece-item-component";

export const PieceItemComponent = ({
    piece,
}: {
    piece: { value: string; label: string; link?: string };
}) => {
    const { value, label, link } = piece;
    const component = (() => {
        if (link) {
            return (
                <strong className={styles[`${namespace}__value`]}>
                    <a target="_blank" href={link}>
                        {value}
                    </a>
                </strong>
            );
        }
        return (
            <strong className={styles[`${namespace}__value`]}>{value}</strong>
        );
    })();
    return (
        <div className={styles[namespace]}>
            <p className={styles[`${namespace}__label`]}>{label}</p>
            {component}
        </div>
    );
};
