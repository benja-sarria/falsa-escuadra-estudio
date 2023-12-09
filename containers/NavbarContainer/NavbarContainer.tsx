import { NavbarComponent } from "@/components/NavbarComponent/NavbarComponent";
import { ReactNode } from "react";

export const NavbarContainer = ({
    children,
    variant,
}: {
    children: ReactNode;
    variant?: "dark" | "default";
}) => {
    return <NavbarComponent variant={variant}>{children}</NavbarComponent>;
};
