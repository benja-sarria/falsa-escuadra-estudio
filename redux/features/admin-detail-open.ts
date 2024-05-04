import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialAdminDetailStateType = {
    value: boolean;
};
const initialAdminDetailValue: initialAdminDetailStateType = {
    value: false,
};

export const adminDetailOpened = createSlice({
    name: "adminDetailOpened",
    initialState: initialAdminDetailValue,
    reducers: {
        resetAdminDetailOpened: () => {
            return initialAdminDetailValue;
        },
        setAdminDetailOpened: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { resetAdminDetailOpened, setAdminDetailOpened } =
    adminDetailOpened.actions;
export default adminDetailOpened.reducer;
