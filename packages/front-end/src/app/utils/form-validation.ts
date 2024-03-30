import Joi from "joi";

export interface IForm {
    code: string;
    url: string;
}

export interface IFieldError {
    [key: string]: string;
}

export const initialValues = {
    code: "",
    url: "",
};

export const formValidations = (formValues: IForm) => {
    const fieldsValidationSchema = {
        url: Joi.string().required().trim().uri().min(3).messages({
            "string.base": "Must be a string",
            "string.empty": "Must type an url",
            "string.min": "At least 3 characters",
            "string.uri": "Must be a valid url",
            "any.required": "Must type an url",
        }),
        code: Joi.string().required().trim().min(3).max(10).messages({
            "string.base": "Must be a string",
            "string.empty": "Must type a code",
            "string.min": "At least 3 characters",
            "string.max": "Max 10 characters",
            "any.required": "Must type a code",
        }),
    };

    const errors: IFieldError = {};

    const schema = Joi.object(fieldsValidationSchema);

    const objError = schema.validate(formValues, { abortEarly: false });

    if (objError.error) {
        objError.error.details.forEach((err) => {
            errors[err.path.join(".")] = err.message;
        });
    }

    return errors;
};
