import { ProductReceivedType } from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialSearchStateType = {
    value: { opened: boolean; term: string | undefined };
};
const initialSearchValue: initialSearchStateType = {
    value: { opened: false, term: undefined },
};

export const search = createSlice({
    name: "search",
    initialState: initialSearchValue,
    reducers: {
        resetSearch: () => {
            return initialSearchValue;
        },
        setSearch: (
            state,
            action: PayloadAction<initialSearchStateType["value"]>
        ) => {
            console.log(state, action);

            state.value = action.payload;
        },
    },
});

export const { resetSearch, setSearch } = search.actions;
export default search.reducer;
