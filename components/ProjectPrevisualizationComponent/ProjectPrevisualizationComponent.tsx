import styles from "@/components/ProjectPrevisualizationComponent/ProjectPrevisualizationComponent.module.scss";

import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { ProductWithIncludeType } from "@/types/projectTypes";
import { autoFigureItOutMeasureLimit } from "@/utils/img/proportions";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { useAppSelector } from "@/redux/store";

export const ProjectPrevisualizationComponent = ({
    project,
}: {
    project: ProductWithIncludeType;
}) => {
    const searchTexts = useAppSelector((state) => state.globalLanguage.value)
        .messages?.layout.search;
    return (
        <div className={styles["previsualization-container"]}>
            <div className={styles["image-container"]}>
                {screen.availWidth < 768 ? (
                    <AutoAdjustImgComponent
                        alt={project.title}
                        givenClassName={styles["portrait-inner"]}
                        src={(() => {
                            const portrait = project.photos.find(
                                (photo) => photo.isPortrait
                            );
                            return portrait ? `${portrait.src}` : "/image.png";
                        })()}
                        calculate="height"
                        fixedParameter="--img-min-width"
                    />
                ) : (
                    <AutoAdjustImgComponent
                        alt={project.title}
                        givenClassName={styles["portrait-inner"]}
                        src={(() => {
                            const portrait = project.photos.find(
                                (photo) => photo.isPortrait
                            );
                            return portrait ? `${portrait.src}` : "/image.png";
                        })()}
                        customCallback={(imgNode: HTMLImageElement) => {
                            autoFigureItOutMeasureLimit(
                                imgNode,
                                " --img-min-width",
                                "--img-min-height"
                            );
                        }}
                    />
                )}
            </div>
            <h5 className={styles["title"]}>{project.title}</h5>
            <p className={styles["text"]}>
                {project.content.length > 280
                    ? `${project.content.slice(0, 280)}...`
                    : project.content}
            </p>
            <ReusableButtonComponent
                styleVariants={["search-project"]}
                text={searchTexts && searchTexts.results.viewProjectBtn}
            />
        </div>
    );
};
