import { StandardAPIError } from "@/utils/api/standarizedErrors";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

export class ContactServices {
    service?: string;
    host?: string;
    constructor({ service, host }: { service?: string; host?: string }) {
        this.service = service;
        this.host = host;
    }
    private async createTransport() {
        try {
            const transportConfig: any = {
                port: +`${process.env.MAIL_PORT}`,
                secure: true,
                auth: {
                    user: `${process.env.MAIL_ACCOUNT}`,
                    pass: `${process.env.MAIL_SECRET_ACCESS_KEY}`,
                },
            };

            if (this.service) {
                transportConfig.service = this.service;
            } else {
                transportConfig.host = this.host;
            }

            const transporter = nodemailer.createTransport(transportConfig);

            return { success: true, transporter };
        } catch (error: any) {
            return { success: false, error: "something went wrong" };
        }
    }

    async sendEmail(mailData: Options) {
        try {
            const { success, transporter } = await this.createTransport();
            if (!success || !transporter) {
                return { error: "Couldn't set up transporter", success: false };
            }

            const verify = await transporter.verify();

            if (!verify) {
                return { success: false, error: "Couldn't set up transporter" };
            }

            const result = await transporter.sendMail(mailData);

            if (result.rejected.length > 0) {
                return { success: false, error: "We couldn't send the email" };
            }

            return {
                success: true,
            };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }
}
