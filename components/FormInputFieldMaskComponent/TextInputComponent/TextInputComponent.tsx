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
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const internalHandler = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const target = evt.target;
            if (target) {
                setValue(target.value);

                dispatch(onChange({ data: target.value, field: fieldName }));
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
        <input
            aria-label="text-field"
            value={value}
            onChange={internalHandler}
            className={styles[namespace]}
            placeholder={placeholder ?? "Escribe aqui..."}
        />
    );
};
