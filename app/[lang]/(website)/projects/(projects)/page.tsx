import styles from "@/app/[lang]/(website)/(home)/page.module.scss";
import { ProjectsPortraitComponent } from "@/components/ProjectsPortraitComponent/ProjectsPortraitComponent";
import { ProjectSelectorContainer } from "@/containers/ProjectSelectorContainer/ProjectSelectorContainer";
export default function Projects() {
    return (
        <main className={styles["main-container"]}>
            <ProjectsPortraitComponent />
            <ProjectSelectorContainer />
        </main>
    );
}
