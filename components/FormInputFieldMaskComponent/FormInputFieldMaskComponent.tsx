"use client";

import React, { ReactElement } from "react";

const nameSpace = "form-input-field-mask";
import styles from "@/components/FormInputFieldMaskComponent/FormInputFieldMaskComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";

const FormInputFieldMaskComponent: React.FC<{
    children: ReactElement | ReactElement[];
}> = ({ children }) => {
    const currentStage = useAppSelector(
        (state) => state.contactFormState.value.stage
    );
    return (
        <div className={styles[nameSpace]}>
            <div className={styles[`${nameSpace}__number-pill`]}>
                0{currentStage}
            </div>
            {children}
            <ReusableButtonComponent
                icon={
                    <AutoAdjustImgComponent
                        alt="arrow"
                        givenClassName={styles[`${nameSpace}__icon`]}
                        src="/assets/img/icons/arrow.svg"
                        calculate="width"
                        fixedParameter="--img-min-height"
                    />
                }
                aria-label="next button"
                styleVariants={[`${nameSpace}__next-button`]}
            />
        </div>
    );
};

export default FormInputFieldMaskComponent;
