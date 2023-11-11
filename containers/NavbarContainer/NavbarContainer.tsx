import { NavbarComponent } from "@/components/NavbarComponent/NavbarComponent";
import { ReactNode } from "react";

export const NavbarContainer = ({ children }: { children: ReactNode }) => {
    return <NavbarComponent>{children}</NavbarComponent>;
};
