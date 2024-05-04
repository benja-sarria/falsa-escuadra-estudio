"use client";

import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/components/FormInputFieldMaskComponent/TextInputComponent/TextInputComponent.module.scss";

const namespace = "text-input-component";

export const TextInputComponent = ({
    onChange,
    fieldName,
    placeholder,
}: {
    onChange: any;
    fieldName: string;
    placeholder?: string;
}) => {
    const [value, setValue] = useState<string | null>(null);
    const isDimensional =
        fieldName === "height" ||
        fieldName === "width" ||
        fieldName === "depth";

    const dispatch = useDispatch<AppDispatch>();
    const internalHandler = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const target = evt.target;
            if (target) {
                let parsedValue = null;

                if (target.value !== "") {
                    parsedValue = target.value.replaceAll(",", ".");
                }

                setValue(parsedValue);

                dispatch(
                    onChange({
                        data: parsedValue,
                        field: fieldName,
                    })
                );
            }
        },
        [onChange]
    );

    useEffect(() => {
        return () => {
            setValue("");
        };
    }, [onChange]);

    return (
        <div className={styles[namespace]}>
            <input
                aria-label="text-field"
                value={value ?? ""}
                onChange={internalHandler}
                className={`${styles[`${namespace}__input`]}${
                    isDimensional
                        ? ` ${styles[`${namespace}__input--shorten`]}`
                        : ""
                }`}
                placeholder={placeholder ?? "Escribe aquí..."}
            />
            {isDimensional && (
                <span className={styles[`${namespace}__unit--show`]}>cm</span>
            )}
        </div>
    );
};
