import styles from "@/components/AboutUsInfoCardComponent/AboutUsInfoCardComponent.module.scss";

export const AboutUsInfoCardComponent = ({
    info,
    number,
    staticText,
}: {
    info: { title: string; content: string };
    number: number;
    staticText: string;
}) => {
    return (
        <div className={styles["card-container"]}>
            <p className={styles["pre-text"]}>
                {staticText}
                <span>{"Nro. " + number}</span>
            </p>
            <h3 className={styles["title"]}>{info.title}</h3>
            <p className={styles["content"]}>{info.content}</p>
        </div>
    );
};
