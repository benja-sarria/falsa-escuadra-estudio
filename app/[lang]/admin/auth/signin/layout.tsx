import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { acceptedLocales } from "@/utils/api/getLocale";
import { NavbarContainer } from "@/containers/NavbarContainer/NavbarContainer";
import { SearchBoxContainer } from "@/containers/SearchBoxContainer/SearchBoxContainer";
import { FooterComponent } from "@/components/FooterComponent/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Falsa Escuadra Estudio | Login",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default async function AdminLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: (typeof acceptedLocales)[number] };
}) {
    return (
        <>
            {children}
            <FooterComponent />
        </>
    );
}
