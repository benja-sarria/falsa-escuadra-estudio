import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialOpenedProductValueType = {
    value: ProductReceivedType | undefined;
};
const openedProductInitialValue: InitialOpenedProductValueType = {
    value: undefined,
};

export const openedProductValue = createSlice({
    name: "openedProductValue",
    initialState: openedProductInitialValue,
    reducers: {
        resetOpenedProduct: () => {
            return openedProductInitialValue;
        },
        setOpenedProduct: (
            state,
            action: PayloadAction<ProductReceivedType>
        ) => {
            console.log(state, action);
            if (!state.value) {
                state.value = action.payload;
            }
        },
    },
});

export const { resetOpenedProduct, setOpenedProduct } =
    openedProductValue.actions;
export default openedProductValue.reducer;
