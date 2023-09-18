import MiniDrawerComponent from "@/components/MiniDrawerComponent/MiniDrawerComponent";
import { AdminSectionType } from "@/types/adminSectionTypes";
import { authOptions } from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";

export const MiniDrawerContainer = async () => {
    const session = await getServerSession(authOptions);
    const enabledSections: AdminSectionType = (() => {
        if ((session?.user as any).roleLvl === 2) {
        }
        if ((session?.user as any).roleLvl === 1) {
            return ["dashboard", "products", "users", "profile"];
        }
        return ["dashboard", "products"];
    })();
    console.log("[SESSION]", session);
    return (
        <MiniDrawerComponent
            session={session}
            enabledSections={enabledSections}
        />
    );
};
