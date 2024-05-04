import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialFormStageType = {
    value: number;
};
const initialFormStage: InitialFormStageType = {
    value: 1,
};

export const formStage = createSlice({
    name: "formStage",
    initialState: initialFormStage,
    reducers: {
        resetFormStage: () => {
            return initialFormStage;
        },
        setFormStage: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { resetFormStage, setFormStage } = formStage.actions;
export default formStage.reducer;
