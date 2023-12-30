import styles from "@/app/[lang]/(website)/(home)/page.module.scss";
import { ContactPortraitComponent } from "@/components/ContactPortraitComponent/ContactPortraitComponent";

export default function Projects() {
    return (
        <main
            className={`${styles["main-container"]} ${styles["main-contact-container"]}`}
        >
            <ContactPortraitComponent />
        </main>
    );
}
