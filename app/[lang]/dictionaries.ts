import { acceptedLocales } from "@/middleware";
import "server-only";

const dictionaries: { [id: (typeof acceptedLocales)[number]]: Function } = {
    es: () => import("@/messages/es.json").then((module) => module.default),
    "en-US": () =>
        import("@/messages/en-US.json").then((module) => module.default),
};

export const getDictionary = async (locale: (typeof acceptedLocales)[number]) =>
    (dictionaries[locale as any] as any)();
