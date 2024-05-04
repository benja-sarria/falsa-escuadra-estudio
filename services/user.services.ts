import { UsersPrismaDAO } from "@/models/daos/user.dao";
import {
    ErrorApiResponseInterface,
    NonExistentApiResponseInterface,
} from "@/types/standardApiResponses";
import { GoogleLoggedInProfileInterface } from "@/types/userQueryTypes";
import { User } from "@prisma/client";

export class UserServices {
    usersDAO: UsersPrismaDAO;

    constructor(usersDAO: UsersPrismaDAO) {
        this.usersDAO = usersDAO;
    }
    async getUserRoleLvlService(profile: GoogleLoggedInProfileInterface) {
        let nonexistentUserRoleLvl;
        const roleLvl = await this.usersDAO.getUserRoleLvl({
            where: {
                email: profile.email,
            },
        });

        if ((roleLvl as NonExistentApiResponseInterface).nonExistent) {
            const newUser: User | ErrorApiResponseInterface =
                await this.usersDAO.createUser(profile);
            if ((newUser as ErrorApiResponseInterface).error) {
                return newUser;
            }
            nonexistentUserRoleLvl = (newUser as User).roleId;
        }
        const definitiveRole =
            typeof roleLvl === "number" ? roleLvl : nonexistentUserRoleLvl;

        return definitiveRole;
    }

    async getAdminUsersService(profile: GoogleLoggedInProfileInterface) {
        const definitiveRole = await this.getUserRoleLvlService(profile);
        if (definitiveRole !== +`${process.env.SUPER_ADMIN_ROLE}`) {
            return {
                message: "No autorizado",
                error: true,
                success: false,
            };
        }
        const users = await this.usersDAO.getAdminUsers();
        return users;
    }
}
