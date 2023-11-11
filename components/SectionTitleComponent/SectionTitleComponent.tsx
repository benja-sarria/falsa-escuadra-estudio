import styles from "@/components/SectionTitleComponent/SectionTitleComponent.module.scss";
import { parseVariants } from "@/utils/styles/parseVariants";
import { parseTags } from "@/utils/text/parseTags";

export const SectionTitleComponent = ({
    highlighted,
    text,
    styleVariants,
}: {
    highlighted?: string;
    text?: string;
    styleVariants: string[];
}) => {
    return (
        <h2
            className={`${styles["home-carousel-title"]}${
                styleVariants && styleVariants.length > 0
                    ? parseVariants(styleVariants, styles)
                    : ""
            }`}
        >
            {text && parseTags(text)}
        </h2>
    );
};
