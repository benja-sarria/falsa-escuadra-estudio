export class NewUserDTO {
    email: string;
    name: string;
    roleId: number;
    createdAt: any;
    updatedAt: any;

    constructor({
        email,
        name,
        date,
    }: {
        email: string;
        name: string;
        date: any;
    }) {
        this.email = email;
        this.name = name;
        this.roleId = 3;
        this.createdAt = date;
        this.updatedAt = date;
    }
}
