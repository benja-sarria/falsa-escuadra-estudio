"use client";

import React, { ReactElement } from "react";

const nameSpace = "form-input-field-mask";
import styles from "@/components/FormInputFieldMaskComponent/FormInputFieldMaskComponent.module.scss";
import { useAppSelector } from "@/redux/store";

const FormInputFieldMaskComponent: React.FC<{
    children: ReactElement;
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
        </div>
    );
};

export default FormInputFieldMaskComponent;
