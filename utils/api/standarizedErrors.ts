export class StandardAPIError {
    error: Boolean;
    message: string;
    success: Boolean;
    data?: any;
    constructor(message: string, success?: boolean) {
        (this.error = true),
            (this.message = message),
            (this.success = success ? success : false);
    }
}
