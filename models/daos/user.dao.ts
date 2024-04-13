import prisma from "@/db/singleton";
import {
    GoogleLoggedInProfileInterface,
    QueryParamsInterface,
} from "@/types/userQueryTypes";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NewUserDTO } from "../dtos/NewUser.dto";

export class UsersPrismaDAO {
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

    //@ts-ignore
    static #dbInstances: DatabaseInstancesInterface = {};
    constructor() {
        this.db = prisma;
    }

    async getUserRoleLvl(params: QueryParamsInterface) {
        const users = await this.getAdminUsers(params);

        if (users.length < 1) {
            return {
                error: false,
                nonExistent: true,
                message: "Unexistent user",
            };
        }

        return users[0].roleId;
    }
    async createUser(userData: GoogleLoggedInProfileInterface) {
        const timestamp = new Date().toISOString();

        const parsedData = new NewUserDTO({
            email: userData.email,
            date: timestamp,
            name: userData.name,
        });

        const newUser = await this.db.user.create({
            data: {
                ...parsedData,
                profile: {
                    create: {
                        bio: "",
                        createdAt: timestamp,
                        updatedAt: timestamp,
                        photo: "/img.png",
                    },
                },
            },
        });

        if (!newUser) {
            return {
                message: "Error saving user",
                error: true,
                success: false,
            };
        }
        return newUser;
    }

    async getAdminUsers(params?: QueryParamsInterface): Promise<any> {
        const users = await this.db.user.findMany({ ...params });

        if (users.length < 1) {
            return {
                message: "No se encontraron usuarios",
                error: false,
                success: false,
                data: [],
            };
        }
        return users;
        /*     const parsedList = dbUsers.map((user: any) => {
            return { ...new UserAdminListItemDTO(user) };
        });

        const responseObject = {
            error: false,
            success: true,
            pageCurrent: +page,
            pagesTotals: dbUsersCount.TOTAL_PAGES,
            rowLength: querySize,
            recordsTotal: dbUsersCount.TOTAL_ROWS,
            data: [...parsedList],
        };

        return responseObject; */
    }

    /*
    async getUserRoles() {
        const rolesVars = new SP_ROLES_SEL_BIND_VARS_DTO({});

        const dbRoles = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_ROLES_SEL",
            variablesObj: { ...rolesVars },
            variablesString: obtainBindVarsString({ ...rolesVars }),
        });

        const parsedRoles = dbRoles.map((role: any) => {
            return { ...new RoleListItemDTO(role) };
        });

        return parsedRoles;
    }

    async updateUserRole(userSlug: string, newRoleSlug: string) {
        const rolesVars = new SP_ROLES_SEL_BIND_VARS_DTO({
            estrategia: `${newRoleSlug}`,
        });

        const [newRoleId] = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_ROLES_SEL",
            variablesObj: { ...rolesVars },
            variablesString: obtainBindVarsString({ ...rolesVars }),
        });

        if (!newRoleId) {
            return {
                message: "Ocurrió un error, intenta nuevamente",
                error: true,
                success: false,
            };
        }

        const updateVars = new SP_USERS_UPDATE_BIND_VARS_DTO({
            pSlug: `${userSlug}`,
            updRol: newRoleId.ID_ROL,
        });

        const updatedUser = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_USERS_UPDATE",
            variablesObj: { ...updateVars },
            variablesString: obtainBindVarsString({ ...updateVars }),
        });

        if (updatedUser.length < 1) {
            return {
                message: "Ocurrió un error, intenta nuevamente",
                error: true,
                success: false,
            };
        }
        return {
            message: "Actualizado correctamente",
            error: false,
            success: true,
        };
    }

    async updateUserPassword(userID: number, password: string) {
        const newPassword = this.createHash(password);

        const updateVars = new SP_USERS_UPDATE_BIND_VARS_DTO({
            pIdUsuario: userID,
            updContrasena: `${newPassword}`,
        });

        const updatedUser = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_USERS_UPDATE",
            variablesObj: { ...updateVars },
            variablesString: obtainBindVarsString({ ...updateVars }),
        });

        if (updatedUser.length < 1) {
            return {
                message: "Ocurrió un error, intenta nuevamente",
                error: true,
                success: false,
            };
        }

        return {
            message: "Actualizado correctamente",
            error: false,
            success: true,
        };
    }

     async createResetPasswordRequest(
        userEmail: string,
        token: string
    ) {
        const userQuery = await this.getUserByEmail(userEmail);
        const { ID_USUARIO: userID } = userQuery;

        if (userQuery.error) {
            return {
                message: "Usuario inexistente",
                error: true,
                success: false,
            };
        }

        const parsedDataForDB = new ResetPasswordRequestDTO(
            token,
            userID,
            await formatDateForDB(this.req.db),
            await formatHourAheadForDB(this.req.db)
        );

        const parsedPwdReqVars =
            new SP_SOLICITUDES_RESTABLECER_CONTRASENA_INS_BIND_VARS_DTO({
                ...parsedDataForDB,
            });

        const savedRequest = await executeInsertSP({
            knexInstance: this.req.db,
            spName: "SP_SOLICITUDES_RESTABLECER_CONTRASENA_INS",
            variablesObj: { ...parsedPwdReqVars },
            variablesString: obtainBindVarsString({ ...parsedPwdReqVars }),
        });

        if (savedRequest < 1) {
            return {
                message: "Hubo un error al guardar la solicitud",
                error: true,
                success: false,
            };
        }

        return {
            message: "Solicitud guardada correctamente",
            error: false,
            success: true,
        };
    }

    async getPreviousRequest(userEmail: string) {
        const userQuery = await this.getUserByEmail(userEmail);
        const { ID_USUARIO: userID } = userQuery;

        if (userQuery.error) {
            return {
                message: "Usuario inexistente",
                error: true,
                success: false,
            };
        }
        const requestVars =
            new SP_SOLICITUDES_REST_CONTRASENA_SEL_BIND_VARS_DTO({
                idUsuario: +userID,
            });

        const previousRequest = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_SOLICITUDES_REST_CONTRASENA_SEL",
            variablesObj: { ...requestVars },
            variablesString: obtainBindVarsString({ ...requestVars }),
        });

        const currentSysdate = await this.getDBSysdate();

        return { previousRequest, currentSysdate };
    }

    async getDBSysdate() {
        const sysdateVars = {
            P_SYSDATE: {
                dir: oracle.BIND_OUT,
                type: oracle.DATE,
            },
        };

        const currentSysdate = await executeSysdateSP({
            knexInstance: this.req.db,
            spName: "SP_SYSDATE_SEL",
            variablesObj: { ...sysdateVars },
            variablesString: obtainBindVarsString({ ...sysdateVars }),
        });

        return currentSysdate;
    }

    async deletePrevRequest(requestID: number) {
        const deleteVars =
            new SP_SOLICITUDES_RESTABLECER_CONTRASENA_DEL_BIND_VARS_DTO({
                filterId: +requestID,
            });

        const deleted = await executeDeleteSP({
            knexInstance: this.req.db,
            variablesObj: { ...deleteVars },
            variablesString: obtainBindVarsString({ ...deleteVars }),
            spName: "SP_SOLICITUDES_RESTABLECER_CONTRASENA_DEL",
        });

        if (deleted.length < 1) {
            return {
                message: "Hubo un error al intentar eliminar la solicitud",
                error: true,
                success: false,
            };
        }

        return {
            message: "Eliminada correctamente",
            error: false,
            success: true,
        };
    }

    async checkRequestCode(query: string) {
        const codeVars = new SP_SOLICITUDES_REST_CONTRASENA_SEL_BIND_VARS_DTO({
            token: `${query}`,
        });

        const checkCode = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_SOLICITUDES_REST_CONTRASENA_SEL",
            variablesObj: { ...codeVars },
            variablesString: obtainBindVarsString({ ...codeVars }),
        });

        if (checkCode.length < 1) {
            return {
                message: "Query inválida",
                error: true,
                success: false,
            };
        }

        return {
            error: false,
            success: true,
            data: checkCode,
        };
    }

    async saveUserToDB(cidiCuil: string, email: string) {
        const timestamp = new Date().toISOString();
        const userName = uuidv4();

        const parsedUserVars = new SP_USERS_INS_BIND_VARS_DTO({
            NOMBRE_USUARIO: userName,
            CONTRASENA: this.createHash(uuidv4()),
            TOKEN: uuidv4(),
            EMAIL: email,
            CUIL_PERSONA_FISICA: +cidiCuil,
            FEC_ALTA: await formatDateForDB(this.req.db),
            FEC_MODIF: await formatDateForDB(this.req.db),
            ID_ROL: 2,
            ESTRATEGIA: userName,
        });

        const savedUser = await executeInsertSP({
            knexInstance: this.req.db,
            spName: "SP_USERS_INS",
            variablesObj: { ...parsedUserVars },
            variablesString: obtainBindVarsString({ ...parsedUserVars }),
        });

        if (savedUser !== 1) {
            return {
                message: "Error guardando el usuario en la db",
                error: true,
                success: false,
            };
        }
        const bindVars = new SP_USERS_SEL_BIND_VARS_DTO({
            email: `${email}`,
            includeSensible: 1,
        });

        const [userToReturn] = await executeSP({
            knexInstance: this.req.db,
            spName: "SP_USERS_SEL",
            variablesObj: { ...bindVars },
            variablesString: obtainBindVarsString({ ...bindVars }),
        });

        return userToReturn;
    }

    async getUserByCUIL(cidiCuil: string, email: string) {
        try {
            const bindVars = new SP_USERS_SEL_BIND_VARS_DTO({
                cuilPersFisica: +cidiCuil,
                includeSensible: 1,
            });

            const userQuery = await executeSP({
                knexInstance: this.req.db,
                spName: "SP_USERS_SEL",
                variablesObj: { ...bindVars },
                variablesString: obtainBindVarsString({ ...bindVars }),
            });

            const [user] = userQuery;

            if (userQuery.length < 1) {
                const dbUser = await this.saveUserToDB(cidiCuil, email);
                return dbUser;
            }
            if (user.EMAIL !== email) {
                const updateEmailVars = new SP_USERS_UPDATE_BIND_VARS_DTO({
                    pCuil: +cidiCuil,
                    updEmail: `${email}`,
                });

                const updatedEmailUser = await executeSP({
                    knexInstance: this.req.db,
                    spName: "SP_USERS_UPDATE",
                    variablesObj: { ...updateEmailVars },
                    variablesString: obtainBindVarsString({
                        ...updateEmailVars,
                    }),
                });

                return updatedEmailUser;
            }

            return user;
        } catch (error: any) {
            throw new CustomError(STATUS.SERV_ERROR, error.message, `${error}`);
        }
    }

    async getUserByEmail(userEmail: string) {
        try {
            const bindVars = new SP_USERS_SEL_BIND_VARS_DTO({
                email: `${userEmail}`,
                includeSensible: 1,
            });

            const userQuery = await executeSP({
                knexInstance: this.req.db,
                spName: "SP_USERS_SEL",
                variablesObj: { ...bindVars },
                variablesString: obtainBindVarsString({ ...bindVars }),
            });

          
            const [user] = userQuery;

            if (userQuery && userQuery.length < 1) {
                return {
                    message: "Usuario inexistente",
                    error: true,
                    success: false,
                };
            }

            return user;
        } catch (error: any) {
            throw new CustomError(STATUS.SERV_ERROR, error.message, `${error}`);
        }
    } */
}
