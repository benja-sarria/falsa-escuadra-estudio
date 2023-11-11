import { StandardAPIError } from "@/utils/api/standarizedErrors";
import { StandardSuccessResponse } from "@/utils/api/standarizedSuccessResponse";

import { GetProfileQueryParamType } from "@/types/profilesTypes";
import { ProfilesPrismaDao } from "@/models/daos/profiles.dao";

export class ProfileServices {
    profilesDao: ProfilesPrismaDao;
    constructor(profilesDao: ProfilesPrismaDao) {
        this.profilesDao = profilesDao;
    }

    async getProfiles(queryParams: GetProfileQueryParamType | undefined) {
        try {
            const profiles = await this.profilesDao.getProfiles(queryParams);
            return new StandardSuccessResponse({ data: profiles });
        } catch (error: any) {
            return new StandardAPIError(error.message);
        }
    }
}
