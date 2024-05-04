"use server";

import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ContactServices } from "@/services/contact.services";
import { ProjectServices } from "@/services/project.services";
import { TemaplateData, generateTemplate } from "@/templates/contactEmail";
import { QueryInterface } from "@/types/contactFormTypes";
import { revalidatePath } from "next/cache";
import { Options } from "nodemailer/lib/mailer";
import path from "path";

export async function updateProductSubmit(formData: FormData) {}

export async function deleteProductPhoto(formData: FormData) {
    const entries = Object.fromEntries(formData);

    const productServices = new ProjectServices(new ProjectPrismaDao());
    const response = await productServices.removePhotoService({
        id: +entries.photoSlug,
    });
}

export async function updateProductPhoto(formData: FormData) {
    const entries = Object.fromEntries(formData.entries());

    const parsedImages = JSON.parse(entries.newImage as string);
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const response = await productServices.updatePhotoService({
        id: +entries.photoSlug,
        src: { data: parsedImages.data, prefix: parsedImages.prefix },
        postSlug: `${entries.postSlug}`,
    });

    if (response.error) {
        return response;
    }
    return revalidatePath(`${entries.validatePath}`);
}

export async function searchProducts(searchTerm: string) {
    const productServices = new ProjectServices(new ProjectPrismaDao());

    const results = await productServices.getProjectService({
        OR: [
            {
                title: {
                    contains: searchTerm,
                },
            },
            { content: { contains: searchTerm } },
        ],
    });

    return results;
    // return revalidatePath(`${entries.validatePath}`);
}

export async function validateRecaptcha(token: string) {
    // Retrieve the secret key from environment variables for the ReCaptcha verification.
    const { GOOGLE_RECAPTHA_HOSTNAME, GOOGLE_RECAPTCHA_SECRET_KEY } =
        process.env;

    const secretKey = GOOGLE_RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        // If the secret key is not found, log an error and return an appropriate response.
        console.error(
            "RECAPTCHA_SECRET_KEY is not set in environment variables."
        );
        return { error: "Server configuration error", success: false };
    }

    // Define the form data for the POST request to the ReCaptcha API.
    const formData = `secret=${secretKey}&response=${token}`;

    try {
        // Make a POST request to the Google ReCaptcha verify API.
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?${formData}`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        if (response.status !== 200) {
            return { error: "Server response error", success: false };
        }

        const parsedResponse: RecaptchaResponseData = await response.json();

        const { success, hostname, score } = parsedResponse;

        const isValidated =
            success &&
            Array.from(eval(`${GOOGLE_RECAPTHA_HOSTNAME}`)).includes(
                hostname
            ) &&
            score &&
            score >= 0.7;

        return { success: true, isValidated };
    } catch (error) {
        // Handle any errors that occur during the API request.
        console.error("Error during ReCaptcha verification:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function submitContactForm(formData: QueryInterface) {
    try {
        const { personalData, query } = formData;
        const { name, lastName, phone, city } = personalData;
        const {
            category,
            meassures,
            dimensions,
            materials,
            complementaryInfo,
        } = query;
        const { depth, height, width } = dimensions;
        const templateData: TemaplateData = {
            name: `${name} ${lastName}`,
            phone: phone,
            location: city,
            category: category!.name,
            meassures: meassures,
            depth,
            height,
            width,
            materials,
            complementaryInfo,
        };
        const template = generateTemplate(templateData);

        const contactServices = new ContactServices({ service: "gmail" });

        const mailData: Options = {
            from: `${process.env.MAIL_SENDER_ADDRESS}`,
            to: `${process.env.MAIL_ACCOUNT}`,
            subject: `Nuevo contacto recibido! - ${templateData.name}`,
            html: template,
            attachments: [
                {
                    filename: "logo.png",
                    path: `${path.resolve(
                        path.join(
                            process.cwd(),
                            "templates/Isologotipo-white.png"
                        )
                    )}`,
                    cid: "falsaescuadralogo", //same cid value as in the html img src
                },
                {
                    filename: "footer.png",
                    path: `${path.resolve(
                        path.join(process.cwd(), "templates/mail-img.png")
                    )}`,
                    cid: "falsaescuadrafooter", //same cid value as in the html img src
                },
            ],
        };

        const result = await contactServices.sendEmail(mailData);

        return result;
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
