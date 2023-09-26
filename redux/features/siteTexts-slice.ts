import { acceptedLocales } from "./../../middleware";
import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialLanguageStateType = {
    value: {
        lang: (typeof acceptedLocales)[number];
        messages: any;
    };
};
const initialLanguageValue: initialLanguageStateType = {
    value: { lang: "es", messages: undefined },
};

export const globalLanguage = createSlice({
    name: "loading",
    initialState: initialLanguageValue,
    reducers: {
        resetLanguage: () => {
            return initialLanguageValue;
        },
        setLanguage: (
            state,
            action: PayloadAction<{ lang: string; messages: any }>
        ) => {
            console.log(state, action);

            state.value = { ...action.payload };
        },
    },
});

export const { resetLanguage, setLanguage } = globalLanguage.actions;
export default globalLanguage.reducer;