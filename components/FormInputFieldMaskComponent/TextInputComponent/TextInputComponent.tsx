"use client";

import {
    StateOptions,
    setName,
} from "@/redux/features/website/contact-form-state-slice";
import { AppDispatch } from "@/redux/store";
import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const TextInputComponent = ({
    onChange,
    fieldName,
}: {
    onChange: any;
    fieldName: string;
}) => {
    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const internalHandler = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const target = evt.target;
            if (target) {
                setValue(target.value);

                dispatch(onChange(target.value));
            }
        },
        [onChange]
    );
    return (
        <input
            aria-label="text-field"
            value={value}
            onChange={internalHandler}
        />
    );
};
