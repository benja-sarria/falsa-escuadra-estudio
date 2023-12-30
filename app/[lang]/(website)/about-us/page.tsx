import styles from "@/app/[lang]/(website)/(home)/page.module.scss";
import { AboutUsCarouselComponent } from "@/components/AboutUsCarouselComponent/AboutUsCarouselComponent";
import { AboutUsPortraitComponent } from "@/components/AboutUsPortraitComponent/AboutUsPortraitComponent";
import { ContactPortraitComponent } from "@/components/ContactPortraitComponent/ContactPortraitComponent";
import { HomePortraitComponent } from "@/components/HomePortraitComponent/HomePortraitComponent";

export default function Projects() {
    return (
        <main className={`${styles["main-container"]}`}>
            <AboutUsPortraitComponent />
            <AboutUsCarouselComponent />
        </main>
    );
}
