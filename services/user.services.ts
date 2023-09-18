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

    /*  async getUserRolesService(admtkn: string) {
        const roleLvl = await this.usersDAO.getUserRoleLvl(admtkn);
        if (roleLvl.error) {
            return roleLvl;
        }
        if (roleLvl <= 3) {
            return {
                message: "No autorizado",
                error: true,
                success: false,
            };
        }
        const roles = await this.usersDAO.getUserRoles();
        return { data: roles, success: true, error: false };
    }
    async updateUserRoleService(
        admtkn: string,
        userSlug: string,
        newRoleSlug: string
    ) {
        const roleLvl = await this.usersDAO.getUserRoleLvl(admtkn);
        if (roleLvl.error) {
            return roleLvl;
        }
        if (roleLvl <= 3) {
            return {
                message: "No autorizado",
                error: true,
                success: false,
            };
        }
        const updatedRole = await this.usersDAO.updateUserRole(
            userSlug,
            newRoleSlug
        );
        return updatedRole;
    }

    async requestResetPasswordService(userEmail: string, res: NextApiResponse) {
        const { previousRequest, currentSysdate, error } =
            await this.usersDAO.getPreviousRequest(userEmail);
        if (error) {
            return res.status(STATUS.SERV_ERROR).send({
                message:
                    "No se ha podido generar la solicitud, intenta nuevamente",
                error: true,
                success: false,
            });
        }
        if (previousRequest && previousRequest.length > 0) {
            const [request] = previousRequest;
            const sysdate = currentSysdate;
            const expiresAt = new Date(request.EXPIRACION);
            const currentTime = new Date(sysdate);

            if (currentTime.getTime() < expiresAt.getTime()) {
                return res.status(STATUS.SERV_ERROR).send({
                    message:
                        "Has solicitado un restablecimiento hace menos de una hora, por favor revisa tu correo electrónico",
                    error: true,
                    success: false,
                });
            } else {
                const deletePrevRequest = await this.usersDAO.deletePrevRequest(
                    request["ID_SOLICITUD_RESTABLECER_CONTRASENA"]
                );

                if (deletePrevRequest.error) {
                    return deletePrevRequest;
                }
            }
        }

        const requestId = uuidv4();
        const restorePasssworLink = `${process.env.UDVT_FRONTEND_URL}/security/users/restorePassword?rqId=${requestId}`;
        try {
            const mailer = handleMailNotification({
                email: `VINnova Plataforma <${process.env.VINNOVA_EMAIL_USER}>`,
                receiverEmail: userEmail,
                subject: `Solicitud de restablecer contraseña: ${userEmail}`,
                htmlContent: restorePasswordTemplate(restorePasssworLink),
            });

            const mailerInfo = await mailer.transporter.sendMail(
                mailer.mailData
            );
        } catch (error) {
            console.log("[FAILURE] =>", error);
        }

        const savedRequest = await this.usersDAO.createResetPasswordRequest(
            userEmail,
            requestId
        );

        return res
            .status(savedRequest.error ? STATUS.SERV_ERROR : STATUS.OK)
            .send(savedRequest);
    }
    async checkResetCodeService(query: string) {
        if (!query) {
            return {
                message: "Query inválida",
                error: true,
                success: false,
            };
        }
        const codeChecker = await this.usersDAO.checkRequestCode(query);

        if (codeChecker.error) {
            return codeChecker;
        }

        const [request] = codeChecker.data as any;

        const expiresAt = new Date(request.EXPIRACION);
        const sysdate = await this.usersDAO.getDBSysdate();
        const parsedCurrentTime = new Date(sysdate);

        if (parsedCurrentTime.getTime() >= expiresAt.getTime()) {
            const deletedExpiredRequest = await this.usersDAO.deletePrevRequest(
                request["ID_SOLICITUD_RESTABLECER_CONTRASENA"]
            );
            return {
                message: "Link vencido, intenta nuevamente obtener otro",
                error: true,
                success: false,
            };
        }

        return { message: "Link validado", success: true, error: false };
    }

    async resetPasswordService(query: string, password: string) {
        if (!query) {
            return {
                message: "Query inválida",
                error: true,
                success: false,
            };
        }
        if (!password) {
            return {
                message: "Password inválida",
                error: true,
                success: false,
            };
        }

        const codeChecker = await this.usersDAO.checkRequestCode(query);

        if (codeChecker.error) {
            return codeChecker;
        }

        const [request] = codeChecker.data as any;

        const expiresAt = new Date(request.EXPIRACION);
        const sysdate = await this.usersDAO.getDBSysdate();
        const parsedCurrentTime = new Date(sysdate);

        if (parsedCurrentTime.getTime() >= expiresAt.getTime()) {
            const deletedExpiredRequest = await this.usersDAO.deletePrevRequest(
                request["ID_SOLICITUD_RESTABLECER_CONTRASENA"]
            );
            return {
                message: "Link vencido, intenta nuevamente obtener otro",
                error: true,
                success: false,
            };
        }

        const deletedExpiredRequest = await this.usersDAO.deletePrevRequest(
            request["ID_SOLICITUD_RESTABLECER_CONTRASENA"]
        );

        const updateUserPassword = await this.usersDAO.updateUserPassword(
            request["ID_USUARIO"],
            password
        );

        return updateUserPassword;
    } */
}
