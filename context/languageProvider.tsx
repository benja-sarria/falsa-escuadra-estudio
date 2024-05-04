"use client";

import { ReactNode, createContext, useEffect } from "react";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setLanguage } from "@/redux/features/siteTexts-slice";
import { acceptedLocales } from "@/utils/api/getLocale";

export const LanguageContext = createContext({});

export const LanguageProvider = ({
    children,
    lang,
}: {
    children: ReactNode;
    lang: (typeof acceptedLocales)[number];
}) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        (async () => {
            const texts = await import(`@/messages/${lang ? lang : "es"}.json`);

            dispatch(setLanguage({ lang: lang, messages: texts.default }));
        })();
    }, []);

    return (
        <LanguageContext.Provider value={{}}>
            {" "}
            {children}{" "}
        </LanguageContext.Provider>
    );
};
