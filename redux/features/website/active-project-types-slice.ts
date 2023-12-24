import {
    ProductReceivedType,
    ProductWithIncludeType,
} from "@/types/projectTypes";
import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AvailableActiveProjectsType = "own" | "custom";

type initialActiveProjectsType = {
    value: AvailableActiveProjectsType;
};
const initialActiveProjectsType: initialActiveProjectsType = {
    value: "custom",
};

export const activeProjectsType = createSlice({
    name: "activeProjectsType",
    initialState: initialActiveProjectsType,
    reducers: {
        resetActiveProjectsType: () => {
            return initialActiveProjectsType;
        },

        setActiveProjectsType: (
            state,
            action: PayloadAction<initialActiveProjectsType["value"]>
        ) => {
            console.log(state, action);

            state.value = action.payload;
        },
    },
});

export const { resetActiveProjectsType, setActiveProjectsType } =
    activeProjectsType.actions;
export default activeProjectsType.reducer;
