import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AvailableSectionsType = "dashboard" | "products" | "users" | "profile";

type InitialSectionType = {
    value: AvailableSectionsType;
};
const initialSection: InitialSectionType = {
    value: "dashboard",
};

export const activeSection = createSlice({
    name: "activeSection",
    initialState: initialSection,
    reducers: {
        resetActiveSection: () => {
            return initialSection;
        },
        selectActiveSection: (
            state,
            action: PayloadAction<AvailableSectionsType>
        ) => {
            console.log(state, action);

            state.value = action.payload;
        },
    },
});

export const { resetActiveSection, selectActiveSection } =
    activeSection.actions;
export default activeSection.reducer;
