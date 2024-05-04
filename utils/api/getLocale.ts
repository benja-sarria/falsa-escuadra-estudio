import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const acceptedLocales = ["es", "en-US"];
// Get the preferred locale, similar to the above or using a library
export function getLocale(data: any, type: "req" | "headers") {
    let headers =
        type === "req"
            ? { "accept-language": data.headers.get("accept-language") }
            : { "accept-language": data().get("accept-language") };
    let languages = new Negotiator({ headers }).languages();
    let defaultLocale = "es";

    return match(languages, acceptedLocales, defaultLocale); // -> 'en-US'
}
