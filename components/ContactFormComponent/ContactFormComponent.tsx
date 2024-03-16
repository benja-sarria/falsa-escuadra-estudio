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
    setFullName,
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

    const InputField = (() => {
        if (currentField.qty && currentField.qty.length > 0) {
            const componentArray = currentField.qty.map((field) => {
                return React.createElement(fieldTypes[currentField.type], {
                    fieldName: field,
                    onChange: setDimensions,
                });
            });
            return componentArray;
        }
        if (currentField.data === "name") {
            return React.createElement(fieldTypes[currentField.type], {
                fieldName: currentField.data,
                onChange: setFullName,
            });
        }
        if (currentField.data === "phone") {
            return React.createElement(fieldTypes[currentField.type], {
                fieldName: currentField.data,
                onChange: setPhone,
            });
        }
        if (currentField.data === "category") {
            return React.createElement(fieldTypes[currentField.type], {
                fieldName: currentField.data,
                onChange: setCategory,
            });
        }
        if (currentField.data === "complementary") {
            return React.createElement(fieldTypes[currentField.type], {
                fieldName: currentField.data,
                onChange: addComplementaryInfo,
            });
        }
    })();

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
