import styles from "@/components/TemporarySignComponent/TemporarySignComponent.module.scss";
import { AnimatedLogoComponent } from "../AnimatedLogoComponent/AnimatedLogoComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

export const TemporarySignComponent = () => {
    return (
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
    );
};
