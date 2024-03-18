"use client";

import React, { ReactElement, useCallback, useEffect, useState } from "react";

const nameSpace = "form-input-field-mask";
import styles from "@/components/FormInputFieldMaskComponent/FormInputFieldMaskComponent.module.scss";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useDispatch } from "react-redux";
import {
    FieldNames,
    advanceStage,
} from "@/redux/features/website/contact-form-state-slice";

const FormInputFieldMaskComponent: React.FC<{
    children: ReactElement | ReactElement[];
    validate?: FieldNames[];
}> = ({ children, validate }) => {
    const [errorState, setErrorState] = useState<boolean>(false);
    const currentStage = useAppSelector(
        (state) => state.contactFormState.value.stage
    );

    const formErrors = useAppSelector(
        (state) => state.contactFormState.value.errors
    );

    useEffect(() => {
        const errors = validate?.some((error: FieldNames) => formErrors[error]);
        if (errors) setErrorState(true);
        else setErrorState(false);
    }, [validate, formErrors]);

    return (
        <>
            <div
                className={`${styles[nameSpace]}${
                    errorState ? ` ${styles[`${nameSpace}--error`]}` : ""
                }`}
            >
                <div className={styles[`${nameSpace}__number-pill`]}>
                    0{currentStage}
                </div>
                <div className={styles[`${nameSpace}__input-container`]}>
                    {children}
                </div>
            </div>
            <p
                className={`${styles[`${nameSpace}__error-text`]}${
                    errorState
                        ? ` ${styles[`${nameSpace}__error-text--visible`]}`
                        : ""
                }`}
            >
                {formErrors.message}
            </p>
        </>
    );
};

export default FormInputFieldMaskComponent;
