import { AutoAdjustImgComponent } from "@/components/AutoAdjustImgComponent/AutoAdjustImgComponent";
import styles from "./page.module.scss";
import { AnimatedLogoComponent } from "@/components/AnimatedLogoComponent/AnimatedLogoComponent";
import { ReusableButtonComponent } from "@/components/ReusableButtonComponent/ReusableButtonComponent";
import { EventHandler, SyntheticEvent } from "react";
import { ReusableButtonContainer } from "@/containers/ReusableButtonContainer/ReusableButtonContainer";

export default function SignIn() {
    return (
        <div className={styles["page-container"]}>
            <div className={styles["logo-outer-container"]}>
                <AnimatedLogoComponent styles={styles}>
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
                        src="/assets/img/icons/fe-ring-black.webp"
                        calculate="height"
                        fixedParameter="--logo-min-width"
                    />
                </div>
            </div>
            <div className={styles["log-in-btn-container"]}>
                <ReusableButtonContainer
                    text="Iniciar Sesión"
                    onClickHandler={"log-in" as any}
                    styleVariants={["outlined", "light", "green-hover"]}
                />
            </div>
        </div>
    );
}
