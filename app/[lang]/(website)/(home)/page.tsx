import Image from "next/image";
import styles from "./page.module.scss";
import { AnimatedLogoComponent } from "@/components/AnimatedLogoComponent/AnimatedLogoComponent";
import { AutoAdjustImgComponent } from "@/components/AutoAdjustImgComponent/AutoAdjustImgComponent";
import { ReusableButtonContainer } from "@/containers/ReusableButtonContainer/ReusableButtonContainer";
import { TemporarySignComponent } from "@/components/TemporarySignComponent/TemporarySignComponent";
import { HomePortraitComponent } from "@/components/HomePortraitComponent/HomePortraitComponent";
import { HomeVideoSectionComponent } from "@/components/HomeVideoSectionComponent/HomeVideoSectionComponent";
import { HomeProductCarouselContainer } from "@/containers/HomeProductCarouselContainer/HomeProductCarouselContainer";
import { WhiteBoardComponent } from "@/components/WhiteBoardComponent/WhiteBoardComponent";
import { AboutUsHomeContainer } from "@/containers/AboutUsHomeContainer/AboutUsHomeContainer";
import ContactUsSectionComponent from "@/components/ContactUsSectionComponent/ContactUsSectionComponent";

export default function Home() {
    return (
        <main className={styles["main-container"]}>
            <HomePortraitComponent />
            <HomeVideoSectionComponent />
            <HomeProductCarouselContainer />
            <WhiteBoardComponent />
            <AboutUsHomeContainer />
            <ContactUsSectionComponent />
            {/*       <TemporarySignComponent /> */}
        </main>
    );
}
