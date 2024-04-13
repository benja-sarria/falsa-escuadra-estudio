import AppBarComponent from "@/components/AppBarComponent/AppBarComponent";
import { authOptions } from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";

export const AppBarContainer = async () => {
    const session = await getServerSession(authOptions);

    return <></>; /* <AppBarComponent session={session} />; */
};
