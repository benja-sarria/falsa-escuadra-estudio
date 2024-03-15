"use client";

import React from "react";
import { useAppSelector } from "@/redux/store";
import FormInputFieldMaskComponent from "../FormInputFieldMaskComponent/FormInputFieldMaskComponent";
import { FormStepperComponent } from "../FormStepperComponent/FormStepperComponent";
import styles from "@/components/ContactFormComponent/ContactFormComponent.module.scss";
import {
    FieldNames,
    FieldType,
    addComplementaryInfo,
    addMaterials,
    setCategory,
    setDimensions,
    setLastName,
    setName,
    setPhone,
    stageFields,
} from "@/redux/features/website/contact-form-state-slice";
import { ReactElement } from "react";
import { TextInputComponent } from "../FormInputFieldMaskComponent/TextInputComponent/TextInputComponent";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const namespace = "contact-form-component";

type ChangeFunction = any;

export const ContactFormComponent = () => {
    const currentStep = useAppSelector(
        (state) => state.contactFormState.value.stage
    );
    const contactForm = useAppSelector((state) => state.contactFormState.value);
    const currentField = stageFields[currentStep];

    const fieldTypes: {
        [key in FieldType]: React.FC<{
            onChange: ChangeFunction;
            fieldName: string;
        }>;
    } = {
        text: TextInputComponent,
        phone: TextInputComponent,
        select: TextInputComponent,
        upload: TextInputComponent,
    };

    const InputField = currentField.qty.map((field: FieldNames) => {
        const onChangeFunction = (() => {
            if (field === "name") {
                return setName;
            }
            if (field === "lastName") {
                return setLastName;
            }
            if (field === "phone") {
                return setPhone;
            }
            if (field === "category") {
                return setCategory;
            }
            if (field === "complementary") {
                return addComplementaryInfo;
            }
            if (field === "depth" || field === "width" || field === "height") {
                return setDimensions;
            }

            return addMaterials;
        })();
        return React.createElement(fieldTypes[currentField.type], {
            fieldName: field,
            onChange: onChangeFunction,
        });
    });

    return (
        <div className={styles[`${namespace}`]}>
            <FormStepperComponent />
            {JSON.stringify(contactForm)}
            <FormInputFieldMaskComponent>
                {InputField}
            </FormInputFieldMaskComponent>
        </div>
    );
};
