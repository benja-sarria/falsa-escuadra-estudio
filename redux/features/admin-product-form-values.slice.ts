import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialValuesType = {
    title: string | undefined;
    content: string | undefined;
    photos: File[] | undefined;
    productType: string | undefined;
};
type InitialFormFieldsValueType = {
    value: InitialValuesType;
};
const productFormFieldsValue: InitialFormFieldsValueType = {
    value: {
        title: undefined,
        content: undefined,
        photos: undefined,
        productType: undefined,
    },
};

export const adminProductFormFieldsValue = createSlice({
    name: "adminProductFormFieldsValue",
    initialState: productFormFieldsValue,
    reducers: {
        resetFormStage: () => {
            return productFormFieldsValue;
        },
        setFormStage: (
            state,
            action: PayloadAction<{
                [id: string]: any;
            }>
        ) => {
            state.value = { ...state.value, ...action.payload };
        },
    },
});

export const { resetFormStage, setFormStage } =
    adminProductFormFieldsValue.actions;
export default adminProductFormFieldsValue.reducer;
