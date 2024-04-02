"use client";

import React, { useCallback } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import FormInputFieldMaskComponent from "../FormInputFieldMaskComponent/FormInputFieldMaskComponent";
import { FormStepperComponent } from "../FormStepperComponent/FormStepperComponent";
import styles from "@/components/ContactFormComponent/ContactFormComponent.module.scss";
import {
    CategoryOptionsType,
    DimensionsType,
    ErrorObject,
    FieldNames,
    FieldType,
    LabelNames,
    addMaterials,
    advanceStage,
    resetFormErrors,
    setCategory,
    setCity,
    setDimensions,
    setFormErrors,
    setFullName,
    setPhone,
    stageFields,
} from "@/redux/features/website/contact-form-state-slice";
import { ReactElement } from "react";
import { TextInputComponent } from "../FormInputFieldMaskComponent/TextInputComponent/TextInputComponent";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ContactPieceComponent } from "../ContactPieceComponent/ContactPieceComponent";

import { SelectInputComponent } from "../FormInputFieldMaskComponent/SelectInputComponent/SelectInputComponent";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { useDispatch } from "react-redux";
import {
    getStageErrors,
    parseFormData,
    validateFormData,
} from "@/utils/validations/validations";

const namespace = "contact-form-component";

export const ContactFormComponent = () => {
    const currentStep = useAppSelector(
        (state) => state.contactFormState.value.stage
    );

    const contactForm = useAppSelector((state) => state.contactFormState.value);
    const currentField = stageFields[currentStep];

    const labelTexts:
        | {
              [key in LabelNames]: {
                  label: string;
              };
          }
        | undefined = useAppSelector(
        (state) => state.globalLanguage.value.messages?.contactForm
    );
    const dispatch = useDispatch<AppDispatch>();

    const onClickHandler = useCallback(() => {
        const stageErrors = getStageErrors(contactForm);

        if (stageErrors?.errors && stageErrors?.errors?.length > 0) {
            const errorObject: ErrorObject = {};
            stageErrors.errors.forEach((stageError: FieldNames) => {
                errorObject[stageError] = true;
            });
            errorObject.message = stageErrors.message;
            console.log("STAGE-ERRORS", errorObject);
            dispatch(setFormErrors(errorObject));
        } else {
            dispatch(resetFormErrors());

            dispatch(advanceStage());
        }
    }, [dispatch, contactForm]);

    const stageComponents = {
        1: (
            <TextInputComponent
                fieldName={`${stageFields[1].data}`}
                onChange={setFullName}
                placeholder={`${stageFields[1].placeholder}`}
            />
        ),
        2: (
            <TextInputComponent
                fieldName={`${stageFields[2].data}`}
                onChange={setPhone}
                placeholder={`${stageFields[2].placeholder}`}
            />
        ),
        3: (
            <TextInputComponent
                fieldName={`${stageFields[3].data}`}
                onChange={setCity}
                placeholder={`${stageFields[3].placeholder}`}
            />
        ),
        4: (
            <SelectInputComponent
                fieldName={`${stageFields[4].data}`}
                onChange={setCategory}
                placeholder={`${stageFields[4].placeholder}`}
                options={stageFields[4].options as CategoryOptionsType}
            />
        ),
        5: (() =>
            stageFields[5]?.qty?.map((field) => (
                <TextInputComponent
                    key={field}
                    fieldName={`${field}`}
                    onChange={setDimensions}
                    placeholder={`${
                        stageFields[5] &&
                        stageFields[5].placeholder &&
                        typeof stageFields[5]?.placeholder !== "string"
                            ? stageFields[5].placeholder[
                                  `${field}` as DimensionsType
                              ]
                            : ""
                    }`}
                />
            )))(),
        6: (
            <TextInputComponent
                fieldName={`${stageFields[6].data}`}
                onChange={setFullName}
                placeholder={`${stageFields[6].placeholder}`}
            />
        ),
        7: (
            <SelectInputComponent
                fieldName={`${stageFields[7].data}`}
                onChange={addMaterials}
                placeholder={`${stageFields[7].placeholder}`}
                options={stageFields[7].options as CategoryOptionsType}
                multiple={true}
            />
        ),
    };

    return (
        <div className={styles[`${namespace}`]}>
            <div className={styles[`${namespace}__left-column`]}>
                <FormStepperComponent />
                <div style={{ color: "white", padding: "3rem 0" }}>
                    {JSON.stringify(contactForm)}
                </div>
                {!labelTexts ? (
                    <></>
                ) : (
                    Object.keys(stageFields).map((stageQuestion) => {
                        return (
                            <div
                                key={`${stageQuestion}-question`}
                                className={`${
                                    styles[`${namespace}__question`]
                                }${
                                    +stageQuestion === +currentStep
                                        ? ` ${
                                              styles[
                                                  `${namespace}__question--active`
                                              ]
                                          }`
                                        : ""
                                }`}
                            >
                                <FormInputFieldMaskComponent
                                    validate={
                                        stageFields[
                                            stageQuestion as unknown as keyof typeof stageFields
                                        ].validate
                                    }
                                >
                                    <div
                                        className={
                                            styles[
                                                `${namespace}__input-container`
                                            ]
                                        }
                                    >
                                        <label
                                            className={
                                                styles[`${namespace}__label`]
                                            }
                                        >
                                            {labelTexts &&
                                                `${
                                                    labelTexts[
                                                        stageFields[
                                                            +stageQuestion as keyof typeof stageFields
                                                        ]
                                                            .data as keyof typeof labelTexts
                                                    ]?.label
                                                }`}
                                        </label>
                                        {
                                            stageComponents[
                                                +stageQuestion as keyof typeof stageComponents
                                            ]
                                        }
                                    </div>
                                </FormInputFieldMaskComponent>
                            </div>
                        );
                    })
                )}
                <ReusableButtonComponent
                    onClickHandler={onClickHandler}
                    icon={
                        <AutoAdjustImgComponent
                            alt="arrow"
                            givenClassName={styles[`${namespace}__icon`]}
                            src="/assets/img/icons/arrow.svg"
                            calculate="width"
                            fixedParameter="--img-min-height"
                        />
                    }
                    aria-label="next button"
                    styleVariants={[`${namespace}__next-button`]}
                />
            </div>
            <div className={styles[`${namespace}__right-column`]}>
                <ContactPieceComponent />
            </div>
        </div>
    );
};
