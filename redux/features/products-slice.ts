import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type validSortCriteriaType =
    | "id"
    | "createdAt"
    | "title"
    | "published"
    | "productTypeId";

type InitialProductsType = {
    products: ProductReceivedType[];
    sortCriteria: validSortCriteriaType;
};
type InitialProductsValueType = {
    value: InitialProductsType;
};
const productsInitialValue: InitialProductsValueType = {
    value: {
        products: [],
        sortCriteria: "id",
    },
};

export const productsValue = createSlice({
    name: "productsValue",
    initialState: productsInitialValue,
    reducers: {
        resetProducts: () => {
            return productsInitialValue;
        },
        setProducts: (
            state,
            action: PayloadAction<{
                [id: string]: any;
            }>
        ) => {
            state.value = { ...state.value, ...action.payload };
        },
    },
});

export const { resetProducts, setProducts } = productsValue.actions;
export default productsValue.reducer;
