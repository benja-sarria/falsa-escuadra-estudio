import MiniDrawerComponent from "@/components/MiniDrawerComponent/MiniDrawerComponent";
import { AppBarContainer } from "@/containers/AppBarContainer/AppBarContainer";
import { authOptions } from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function Admin() {
    const session = await getServerSession(authOptions);
    console.log("[SESSION]", session);
    return (
        <div>
            <MiniDrawerComponent session={session} />
        </div>
    );
}
