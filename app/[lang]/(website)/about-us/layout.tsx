import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { acceptedLocales } from "@/utils/api/getLocale";
import { NavbarContainer } from "@/containers/NavbarContainer/NavbarContainer";
import { SearchBoxContainer } from "@/containers/SearchBoxContainer/SearchBoxContainer";
import { FooterComponent } from "@/components/FooterComponent/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nosotros | Falsa Escuadra Estudio",
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
    return (
        <>
            <NavbarContainer>
                <SearchBoxContainer />
            </NavbarContainer>
            {children}
            <FooterComponent />
        </>
    );
}
