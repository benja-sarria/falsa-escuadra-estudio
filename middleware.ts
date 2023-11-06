import { withAuth } from "next-auth/middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { acceptedLocales, getLocale } from "./utils/api/getLocale";

export default withAuth(
    function middleware(req) {
        // Check if there is any supported locale in the pathname
        const { pathname } = req.nextUrl;
        if (
            !pathname.includes("api") &&
            !pathname.includes("static") &&
            !pathname.includes("assets")
        ) {
            const pathnameHasLocale = acceptedLocales.some(
                (locale) =>
                    pathname.startsWith(`/${locale}/`) ||
                    pathname === `/${locale}`
            );

            if (pathnameHasLocale) return;

            // Redirect if there is no locale
            const locale = getLocale(req, "req");
            req.nextUrl.pathname = `/${locale}${pathname}`;
            // e.g. incoming request is /products
            // The new URL is now /en-US/products
            return Response.redirect(req.nextUrl);
        }
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
