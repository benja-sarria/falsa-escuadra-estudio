import globalLanguage from "./features/siteTexts-slice";
import loading from "./features/loading-slice";
import productsValue from "./features/products-slice";
import { configureStore } from "@reduxjs/toolkit";
import activeSection from "./features/admin-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: { activeSection, productsValue, loading, globalLanguage },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
