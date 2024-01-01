import styles from "@/app/[lang]/(website)/(home)/page.module.scss";
import { AboutUsCarouselComponent } from "@/components/AboutUsCarouselComponent/AboutUsCarouselComponent";
import { AboutUsInfoComponent } from "@/components/AboutUsInfoComponent/AboutUsInfoComponent";
import { AboutUsPortraitComponent } from "@/components/AboutUsPortraitComponent/AboutUsPortraitComponent";
import { ContactPortraitComponent } from "@/components/ContactPortraitComponent/ContactPortraitComponent";
import { HomePortraitComponent } from "@/components/HomePortraitComponent/HomePortraitComponent";
import { AboutUsMapContainer } from "@/containers/AboutUsMapContainer/AboutUsMapContainer";

export default function Projects() {
    return (
        <main className={`${styles["main-container"]}`}>
            <AboutUsPortraitComponent />
            <AboutUsCarouselComponent />
            <AboutUsInfoComponent />
            <AboutUsMapContainer />
        </main>
    );
}
