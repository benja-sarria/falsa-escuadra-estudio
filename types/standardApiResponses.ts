export interface ErrorApiResponseInterface {
    message?: string;
    error?: Boolean;
    success?: Boolean;
}

export interface NonExistentApiResponseInterface {
    message: string;
    nonExistent: Boolean;
    error: Boolean;
}
