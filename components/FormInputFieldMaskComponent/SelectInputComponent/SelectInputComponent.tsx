"use client";

import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/components/FormInputFieldMaskComponent/SelectInputComponent/SelectInputComponent.module.scss";
import { CategoryOptionsType } from "@/redux/features/website/contact-form-state-slice";
import { ReusableButtonComponent } from "@/components/ReusableButtonComponent/ReusableButtonComponent";
import { QueryCategoryInterface } from "@/types/contactFormTypes";
import { FieldTypesType } from "@/utils/form/getInputField";

const namespace = "select-input-component";

export const SelectInputComponent = ({
    onChange,
    fieldName,
    placeholder,
    options,
    multiple = false,
}: FieldTypesType) => {
    const [selectedState, setSelectedState] = useState<
        | { type: string; name: string }
        | { type: string; name: string }[]
        | undefined
    >(undefined);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (selectedState && fieldName === "materials") {
            dispatch(onChange(selectedState));
        }
    }, [selectedState, onChange, dispatch]);

    if (!options) {
        return <></>;
    }

    const optionKeys = Object.keys(options) as Array<keyof CategoryOptionsType>;

    const optionButtons = optionKeys.map((option) => {
        const handleOnSelect = () => {
            const newState = { type: option, name: `${options[option]}` };
            if (multiple) {
                setSelectedState((prevState) => {
                    if (prevState instanceof Array) {
                        const isSelected = prevState.some(
                            (option) => option.type === newState.type
                        );
                        const finalArray = isSelected
                            ? prevState.filter(
                                  (option) => option.type !== newState.type
                              )
                            : [...prevState, newState];
                        return finalArray;
                    }
                    return [newState];
                });
            } else {
                setSelectedState(newState);
                dispatch(onChange(newState));
            }
        };

        let activeClass = "";

        if (
            fieldName === "materials" &&
            multiple &&
            selectedState instanceof Array &&
            selectedState.some((selected) => selected.type === option)
        ) {
            activeClass = `${namespace}__option-button--active`;
        }

        if (
            fieldName === "category" &&
            !multiple &&
            !(selectedState instanceof Array) &&
            option === selectedState?.type
        ) {
            activeClass = `${namespace}__option-button--active`;
        }

        return (
            <ReusableButtonComponent
                key={option}
                styleVariants={[`${namespace}__option-button`, activeClass]}
                text={`${options[option]}`}
                onClickHandler={handleOnSelect}
            />
        );
    });

    return <div className={styles[namespace]}>{optionButtons}</div>;
};
