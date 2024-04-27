import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/authOptions";
import Provider from "./context/sessionProvider";
import { ReduxProvider } from "@/redux/provider";
import { notFound } from "next/navigation";
import { store } from "@/redux/store";
import { setLanguage } from "@/redux/features/siteTexts-slice";
import { LanguageProvider } from "@/context/languageProvider";
import { acceptedLocales } from "@/utils/api/getLocale";
import { NavbarContainer } from "@/containers/NavbarContainer/NavbarContainer";
import { SearchBoxContainer } from "@/containers/SearchBoxContainer/SearchBoxContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Falsa Escuadra Estudio",
    description: "Diseño y producción de mobiliario.",
    robots: "noindex",
    openGraph: {
        type: "website",
        url: "https://test.falsaescuadraestudio.com",
        title: "Especialmente diseñado para vos | Falsa Escuadra Estudio",
        description: "Diseño y producción de mobiliario.",
        siteName: "Falsa Escuadra Estudio",
        images: [
            {
                url: "https://test.falsaescuadraestudio.com/assets/img/icons/logo-og-white.png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@test.falsaescuadraestudio.com",
        images: "https://test.falsaescuadraestudio.com/assets/img/icons/logo-og-white.png",
    },
};

export default async function RootLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: (typeof acceptedLocales)[number] };
}) {
    const session = await getServerSession(authOptions);

    return (
        <Provider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <ReduxProvider>
                        <LanguageProvider lang={lang}>
                            {children}
                        </LanguageProvider>
                    </ReduxProvider>
                </body>
            </html>
        </Provider>
    );
}
