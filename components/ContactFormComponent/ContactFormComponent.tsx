"use client";

import React, { useCallback, useEffect, useState } from "react";
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
    setComplementaryInfo,
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

import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { submitContactForm, validateRecaptcha } from "@/app/actions";
import { QueryInterface } from "@/types/contactFormTypes";

const namespace = "contact-form-component";

export const ContactFormComponent = () => {
    const [isSending, setIsSending] = useState<
        "false" | "true" | "success" | "error"
    >("false");
    const currentStep = useAppSelector(
        (state) => state.contactFormState.value.stage
    );

    const contactForm = useAppSelector((state) => state.contactFormState.value);
    const steps = useAppSelector((state) => state.contactFormState.value.steps);
    const currentField = stageFields[currentStep];

    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        const token = await executeRecaptcha("contact_form");
        // Do whatever you want with the token
        return token;
    }, [executeRecaptcha]);

    const handleSubmitForm = useCallback(
        async (formData: QueryInterface) => {
            setIsSending("true");
            const token = await handleReCaptchaVerify();

            if (!token) {
                setIsSending("error");
                return;
            }
            const validationResult = await validateRecaptcha(token);

            if (!validationResult.success || !validationResult.isValidated) {
                setIsSending("error");
                return;
            }

            const formSubmitted = await submitContactForm(formData);

            if (!formSubmitted.success) {
                setIsSending("error");
                return;
            }

            setIsSending("success");
        },
        [handleReCaptchaVerify]
    );

    // You can use useEffect to trigger the verification as soon as the component being loaded

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
                onChange={setComplementaryInfo}
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

    const isSendingSigns = {
        error: (
            <h5 className={styles[`${namespace}__status-message`]}>
                Hubo un error al enviar el formulario, lo sentimos. Inténtalo
                nuevamente.
            </h5>
        ),
        success: (
            <h5 className={styles[`${namespace}__status-message`]}>
                Tu mensaje se envió correctamente! En breve te estaremos
                contactando.
            </h5>
        ),
        true: (
            <h5 className={styles[`${namespace}__status-message`]}>
                Por favor espera mientras enviamos tu mensaje...
            </h5>
        ),
    };

    const isLastStep =
        currentStep === steps[steps.length - 1] &&
        contactForm.query.materials &&
        contactForm.query.materials.length > 0;

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return (
        <div className={styles[`${namespace}`]}>
            <div className={styles[`${namespace}__left-column`]}>
                {isSending !== "false" ? (
                    isSendingSigns[isSending]
                ) : (
                    <>
                        <FormStepperComponent />

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
                                                        styles[
                                                            `${namespace}__label`
                                                        ]
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
                            onClickHandler={
                                isLastStep
                                    ? () => handleSubmitForm(contactForm)
                                    : onClickHandler
                            }
                            icon={
                                <AutoAdjustImgComponent
                                    alt="arrow"
                                    givenClassName={
                                        styles[`${namespace}__icon`]
                                    }
                                    src="/assets/img/icons/arrow.svg"
                                    calculate="width"
                                    fixedParameter="--img-min-height"
                                />
                            }
                            aria-label="next button"
                            styleVariants={[`${namespace}__next-button`]}
                        />
                    </>
                )}
            </div>
            <div className={styles[`${namespace}__right-column`]}>
                <ContactPieceComponent />
            </div>
        </div>
    );
};
