import { ProductReceivedType } from "@/types/projectTypes";
import { Product, ProductPhotos } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UpdatedPhotosInterface extends ProductPhotos {
    file?: { data: string; prefix: string };
    active?: boolean;
    isUpdated?: boolean;
}

export type PossibleFormValuesType = Partial<
    Omit<ProductReceivedType, "photos">
> & {
    title?: string | undefined;
    content?: string | undefined;
    photos?: UpdatedPhotosInterface[] | undefined;
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
        resetUpdatedProduct: (state, action) => {
            if (state.value && state.value.original) {
                state.value.toUpdate = { ...state.value.original };
            }
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

export const { resetOpenedProduct, setOpenedProduct, resetUpdatedProduct } =
    openedProductValue.actions;
export default openedProductValue.reducer;
