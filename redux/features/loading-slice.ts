import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialLoadingStateType = {
    value: boolean;
};
const initialLoadingValue: initialLoadingStateType = {
    value: false,
};

export const loading = createSlice({
    name: "loading",
    initialState: initialLoadingValue,
    reducers: {
        resetLoading: () => {
            return initialLoadingValue;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { resetLoading, setLoading } = loading.actions;
export default loading.reducer;
