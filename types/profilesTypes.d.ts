import { Profile, User } from "@prisma/client";

export type GetProfileQueryParamType = Partial<Profile>;

export interface ExtendedGetProfileType extends Profile {
    user: { name: User["name"] };
}
