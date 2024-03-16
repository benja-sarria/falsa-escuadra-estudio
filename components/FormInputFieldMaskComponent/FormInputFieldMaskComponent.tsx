"use client";

import React, { ReactElement, useCallback } from "react";

const nameSpace = "form-input-field-mask";
import styles from "@/components/FormInputFieldMaskComponent/FormInputFieldMaskComponent.module.scss";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useDispatch } from "react-redux";
import { advanceStage } from "@/redux/features/website/contact-form-state-slice";

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
            <div className={styles[`${nameSpace}__input-container`]}>
                {children}
            </div>
        </div>
    );
};

export default FormInputFieldMaskComponent;
