import Image from "next/image";
import styles from "./page.module.scss";
import { AnimatedLogoComponent } from "@/components/AnimatedLogoComponent/AnimatedLogoComponent";
import { AutoAdjustImgComponent } from "@/components/AutoAdjustImgComponent/AutoAdjustImgComponent";
import { ReusableButtonContainer } from "@/containers/ReusableButtonContainer/ReusableButtonContainer";

export default function Home() {
    return (
        <main className={""}>
            <div className={styles["page-container"]}>
                <div className={styles["logo-outer-container"]}>
                    <AnimatedLogoComponent styles={styles} staticBehaviour>
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={styles["logo-inner-container"]}
                            src="/assets/img/icons/falsa-escuadra-logo.svg"
                            calculate="height"
                            fixedParameter="--logo-min-width"
                        />
                    </AnimatedLogoComponent>
                    <div className={styles["ring-outer-container"]}>
                        <AutoAdjustImgComponent
                            alt="falsa escuadra logo"
                            givenClassName={styles["ring-inner-container"]}
                            src="/assets/img/icons/fe-ring-white-construction.webp"
                            calculate="height"
                            fixedParameter="--logo-min-width"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
