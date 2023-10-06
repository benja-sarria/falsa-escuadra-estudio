export interface QueryParamsInterface {
    where?: {
        email?: string;
        id?: number;
    };
}

export interface GoogleLoggedInProfileInterface {
    name: string;
    email: string;
    image: string;
}
