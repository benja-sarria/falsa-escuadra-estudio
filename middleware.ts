import { withAuth } from "next-auth/middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// middleware is applied to all routes, use conditionals to select
export const acceptedLocales = ["es", "en-US"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: any) {
    let headers = { "accept-language": request.headers.get("accept-language") };
    let languages = new Negotiator({ headers }).languages();
    let defaultLocale = "es";
    console.log("LOCALES", match(languages, acceptedLocales, defaultLocale));

    return match(languages, acceptedLocales, defaultLocale); // -> 'en-US'
}

export default withAuth(
    function middleware(req) {
        // Check if there is any supported locale in the pathname
        const { pathname } = req.nextUrl;
        const pathnameHasLocale = acceptedLocales.some(
            (locale) =>
                pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
        );

        if (pathnameHasLocale) return;

        // Redirect if there is no locale
        const locale = getLocale(req);
        req.nextUrl.pathname = `/${locale}${pathname}`;
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return Response.redirect(req.nextUrl);
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (
                    req.nextUrl.pathname.includes("/admin") &&
                    !req.nextUrl.pathname.includes("/admin/auth/signin") &&
                    token === null
                ) {
                    return false;
                }
                return true;
            },
        },
    }
);
