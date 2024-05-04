import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { acceptedLocales } from "@/utils/api/getLocale";
import { NavbarContainer } from "@/containers/NavbarContainer/NavbarContainer";
import { SearchBoxContainer } from "@/containers/SearchBoxContainer/SearchBoxContainer";
import { FooterComponent } from "@/components/FooterComponent/FooterComponent";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RecaptchaWrapperProvider } from "@/context/RecaptchaWrapperProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Contacto | Falsa Escuadra Estudio",
    description: "Diseño y producción de mobiliario.",
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
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

export default async function ContactLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: (typeof acceptedLocales)[number] };
}) {
    const { GOOGLE_RECAPTCHA_SITE_KEY } = process.env;
    return (
        <>
            <RecaptchaWrapperProvider siteKey={`${GOOGLE_RECAPTCHA_SITE_KEY}`}>
                <NavbarContainer>
                    <SearchBoxContainer />
                </NavbarContainer>
                {children}
                <FooterComponent />
            </RecaptchaWrapperProvider>
        </>
    );
}
