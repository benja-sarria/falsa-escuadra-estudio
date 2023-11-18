import styles from "@/app/[lang]/(website)/page.module.scss";
import { ProjectsPortraitComponent } from "@/components/ProjectsPortraitComponent/ProjectsPortraitComponent";
export default function Projects() {
    return (
        <main className={styles["main-container"]}>
            <ProjectsPortraitComponent />
        </main>
    );
}
