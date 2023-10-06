export class StandardSuccessResponse {
    error: Boolean;
    message?: string;
    success: Boolean;
    data?: any;
    constructor({
        message,
        success,
        data,
    }: {
        message?: string;
        success?: boolean;
        data: any;
    }) {
        (this.error = false),
            (this.message = message),
            (this.success = success ? success : true);
        this.data = data;
    }
}
