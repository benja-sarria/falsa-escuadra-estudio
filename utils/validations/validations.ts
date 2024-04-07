import {
    FieldNames,
    stageFields,
} from "@/redux/features/website/contact-form-state-slice";
import {
    FormDataErrorInterface,
    QueryInterface,
} from "@/types/contactFormTypes";
import Joi from "joi";

export const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": `Necesitamos que ingreses tu nombre y apellido`,
        "string.empty": `Necesitamos que ingreses tu nombre y apellido`,
        "any.required": `Necesitamos que ingreses tu nombre y apellido`,
    }),
    lastName: Joi.string()
        .min(3)
        .max(30)

        .required()
        .messages({
            "string.base": `Necesitamos que ingreses tu nombre y apellido`,
            "string.empty": `Necesitamos que ingreses tu nombre y apellido`,
            "any.required": `Necesitamos que ingreses tu nombre y apellido`,
        }),
    phone: Joi.string()
        .regex(/^[0-9]{10}$/)
        .messages({
            "string.pattern.base": `Ingresa tu número de teléfono completo`,
            "string.base": `Ingresa tu número de teléfono completo`,
            "string.empty": `Ingresa tu número de teléfono completo`,
            "any.required": `Ingresa tu número de teléfono completo`,
        })
        .required(),
    city: Joi.string().min(3).max(30).required().messages({
        "string.base": `Necesitamos que nos cuentes donde vivís`,
        "string.empty": `Necesitamos que nos cuentes donde vivís`,
        "any.required": `Necesitamos que nos cuentes donde vivís`,
    }),
    category: Joi.object().required().messages({
        "object.base": `Debes seleccionar una categoría`,
        "object.empty": `Debes seleccionar una categoría`,
        "any.required": `Debes seleccionar una categoría`,
    }),
    meassures: Joi.boolean().required(),
    height: Joi.when("meassures", {
        is: false,
        then: Joi.allow(null),
        otherwise: Joi.string().alphanum().messages({
            "string.base": `Debes ingresar todas las medidas`,
            "string.empty": `Debes ingresar todas las medidas`,
            "any.required": `Debes ingresar todas las medidas`,
        }),
    }),
    width: Joi.when("meassures", {
        is: false,
        then: Joi.allow(null),
        otherwise: Joi.string().alphanum().messages({
            "string.base": `Debes ingresar todas las medidas`,
            "string.empty": `Debes ingresar todas las medidas`,
            "any.required": `Debes ingresar todas las medidas`,
        }),
    }),
    depth: Joi.when("meassures", {
        is: false,
        then: Joi.allow(null),
        otherwise: Joi.string().alphanum().messages({
            "string.base": `Debes ingresar todas las medidas`,
            "string.empty": `Debes ingresar todas las medidas`,
            "any.required": `Debes ingresar todas las medidas`,
        }),
    }),
    complementaryInfo: Joi.string().uri().allow(null),
    materials: Joi.array().min(1).required().messages({
        "array.base": `Debes seleccionar al menos un material`,
        "array.empty": `Debes seleccionar al menos un material`,
        "any.required": `Debes seleccionar al menos un material`,
    }),
})
    .with("height", ["width", "depth"])
    .with("width", ["height", "depth"])
    .with("depth", ["height", "width"]);

export const validateFormData = (data: unknown) => {
    return schema.validate(data, { abortEarly: false });
};

export const parseFormData = (
    data: QueryInterface
): FormDataErrorInterface => ({
    name: data.personalData.name,
    lastName: data.personalData.lastName,
    city: data.personalData.city,
    meassures: data.query.meassures,
    phone: data.personalData.phone,
    category: data.query.category,
    height: data.query.dimensions.height,
    width: data.query.dimensions.width,
    depth: data.query.dimensions.depth,
    materials: data.query.materials,
    complementaryInfo: data.query.complementaryInfo,
});

export const getStageErrors = (contactForm: QueryInterface) => {
    console.log("CHECKING-FORM", contactForm);

    const parsedData = parseFormData(contactForm);

    console.log("CHECKING-FORM", parsedData);

    const stageErrors = validateFormData(parsedData);

    const isValidAttachment = parsedData.complementaryInfo
        ? isValidUrl(parsedData.complementaryInfo)
        : true;

    const errorsToSet: FieldNames[] = [];
    const errorObject: { errors?: FieldNames[]; message?: string } = {};
    if (
        stageErrors?.error?.details &&
        stageErrors?.error?.details?.length > 0
    ) {
        stageErrors.error.details.forEach((error) => {
            if (
                error.path.length > 0 &&
                stageFields[
                    contactForm.stage as keyof typeof stageFields
                ].validate?.includes(error.path[0] as FieldNames)
            ) {
                errorsToSet.push(error.path[0] as FieldNames);
                console.log(stageErrors);

                errorObject.message = error.message;
            }
        });
    }
    if (!isValidAttachment) {
        errorsToSet.push("complementaryInfo");
        errorObject.message = "Debes ingresar un link válido";
    }
    errorObject.errors = errorsToSet;
    console.log(errorObject);

    return errorObject;
};

function isValidUrl(string: string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}
