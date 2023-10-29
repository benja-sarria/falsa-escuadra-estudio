import Image from "next/image";
import styles from "./page.module.scss";
import { AnimatedLogoComponent } from "@/components/AnimatedLogoComponent/AnimatedLogoComponent";
import { AutoAdjustImgComponent } from "@/components/AutoAdjustImgComponent/AutoAdjustImgComponent";
import { ReusableButtonContainer } from "@/containers/ReusableButtonContainer/ReusableButtonContainer";
import { TemporarySignComponent } from "@/components/TemporarySignComponent/TemporarySignComponent";
import { HomePortraitComponent } from "@/components/HomePortraitComponent/HomePortraitComponent";
import { HomeVideoSectionComponent } from "@/components/HomeVideoSectionComponent/HomeVideoSectionComponent";

export default function Home() {
    return (
        <main className={""}>
            <HomePortraitComponent />
            <HomeVideoSectionComponent />
            {/*       <TemporarySignComponent /> */}
        </main>
    );
}
