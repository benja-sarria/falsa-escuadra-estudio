import prisma from "../../db/singleton";

import { Prisma, PrismaClient, Profile } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { GetProfileQueryParamType } from "@/types/profilesTypes";

export class ProfilesPrismaDao {
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    constructor() {
        this.db = prisma;
    }

    async getProfiles(queryParams: GetProfileQueryParamType | undefined) {
        try {
            const profiles: Profile[] = await this.db.profile.findMany({
                where: queryParams ? { ...queryParams } : {},
                include: { user: { select: { name: true } } },
            });
            console.log("DAO-PROFILES", profiles);
            if (!profiles) {
                throw new Error("There was a problem querying your data");
            }

            return profiles;
        } catch (error) {
            console.log("ERROR", error);

            throw new Error("There was a problem querying your data");
        }
    }
}
