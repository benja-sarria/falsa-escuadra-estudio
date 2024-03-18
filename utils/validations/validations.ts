import {
    FieldNames,
    stageFields,
} from "@/redux/features/website/contact-form-state-slice";
import { QueryInterface } from "@/types/contactFormTypes";
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
    category: Joi.object().required().messages({
        "object.base": `Debes seleccionar una categoría`,
        "object.empty": `Debes seleccionar una categoría`,
        "any.required": `Debes seleccionar una categoría`,
    }),
    height: Joi.alternatives(
        Joi.when("width", {
            is: null,
            then: Joi.allow(null),
            otherwise: Joi.string().alphanum(),
        })
    ),
    width: Joi.when("height", {
        is: null,
        then: Joi.allow(null),
        otherwise: Joi.string().alphanum(),
    }),
    depth: Joi.string().alphanum().allow(null),
    materials: Joi.array().min(1).required(),
})
    .with("height", ["width", "depth"])
    .with("width", ["height", "depth"])
    .with("depth", ["height", "width"]);

export const validateFormData = (data: unknown) => {
    return schema.validate(data, { abortEarly: false });
};

export const parseFormData = (data: QueryInterface) => ({
    name: data.personalData.name,
    lastName: data.personalData.lastName,
    phone: data.personalData.phone,
    category: data.query.category,
    height: data.query.dimensions.height,
    width: data.query.dimensions.width,
    depth: data.query.dimensions.depth,
    materials: data.query.materials,
});

export const getStageErrors = (contactForm: QueryInterface) => {
    const parsedData = parseFormData(contactForm);

    const stageErrors = validateFormData(parsedData);

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
    errorObject.errors = errorsToSet;
    return errorObject;
};
