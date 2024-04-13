import {
    ProductReceivedType,
    ProductWithIncludeType,
} from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialSearchStateType = {
    value: {
        opened: boolean;
        term: string | undefined;
        results: ProductWithIncludeType[] | undefined;
        selectedResult: ProductWithIncludeType | undefined;
    };
};
const initialSearchValue: initialSearchStateType = {
    value: {
        opened: false,
        term: undefined,
        results: undefined,
        selectedResult: undefined,
    },
};

export const search = createSlice({
    name: "search",
    initialState: initialSearchValue,
    reducers: {
        resetSearch: () => {
            return initialSearchValue;
        },
        resetResults: (state) => {
            state.value = {
                opened: true,
                term: undefined,
                results: undefined,
                selectedResult: undefined,
            };
        },
        setSearch: (
            state,
            action: PayloadAction<initialSearchStateType["value"]>
        ) => {
            state.value = action.payload;
        },
    },
});

export const { resetSearch, setSearch, resetResults } = search.actions;
export default search.reducer;
