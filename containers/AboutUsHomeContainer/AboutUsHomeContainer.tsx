import { AboutUsHomeComponent } from "@/components/AboutUsHomeComponent/AboutUsHomeComponent";
import { ProfilesPrismaDao } from "@/models/daos/profiles.dao";
import { ProfileServices } from "@/services/profile.services";

export const AboutUsHomeContainer = async () => {
    const profilesServices = new ProfileServices(new ProfilesPrismaDao());
    const profiles = await profilesServices.getProfiles({ founder: true });
    console.log("PROFILES", profiles);

    if (profiles.error) {
        return <>There has been an error</>;
    }
    return <AboutUsHomeComponent profiles={profiles.data} />;
};
