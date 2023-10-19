import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PossibleFormValuesType = {
    title?: string | undefined;
    content?: string | undefined;
    photos?: { file: File; active: boolean }[] | undefined;
    productType?: string | undefined;
};

type InitialOpenedProductValueType = {
    value:
        | {
              original?: ProductReceivedType | undefined;
              toUpdate?: PossibleFormValuesType;
          }
        | undefined;
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
            action: PayloadAction<{
                set?: ProductReceivedType;
                update?: PossibleFormValuesType;
            }>
        ) => {
            console.log(state, action);
            if (!state.value) {
                state.value = {};
            }
            if (action.payload.set) {
                state.value.original = action.payload.set;
            }
            if (action.payload.update) {
                state.value.toUpdate = {
                    ...state.value.toUpdate,
                    ...action.payload.update,
                };
            }
        },
    },
});

export const { resetOpenedProduct, setOpenedProduct } =
    openedProductValue.actions;
export default openedProductValue.reducer;
