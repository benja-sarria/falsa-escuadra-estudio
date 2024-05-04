import { AdminMainContentComponent } from "@/components/AdminMainContentcomponent/AdminMainContentComponent";
import MiniDrawerComponent from "@/components/MiniDrawerComponent/MiniDrawerComponent";
import { AdminSectionType } from "@/types/adminSectionTypes";
import { authOptions } from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export const MiniDrawerContainer = async ({
    children,
}: {
    children: ReactNode;
}) => {
    const session = await getServerSession(authOptions);
    const enabledSections: AdminSectionType = (() => {
        if ((session?.user as any).roleLvl === 2) {
        }
        if ((session?.user as any).roleLvl === 1) {
            return ["dashboard", "products", "users", "profile"];
        }
        return ["dashboard", "products"];
    })();

    return (
        <MiniDrawerComponent
            session={session}
            enabledSections={enabledSections}
        >
            {children}
        </MiniDrawerComponent>
    );
};
