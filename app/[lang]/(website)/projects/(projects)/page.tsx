import styles from "@/app/[lang]/(website)/(home)/page.module.scss";
import { ProjectsPortraitComponent } from "@/components/ProjectsPortraitComponent/ProjectsPortraitComponent";
export default function Projects() {
    return (
        <main className={styles["main-container"]}>
            <ProjectsPortraitComponent />
        </main>
    );
}
