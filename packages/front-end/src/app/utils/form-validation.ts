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
        url: Joi.string().required().trim().uri().min(10).messages({
                "string.base": "Url must be a string",
                "string.empty": "You must type an url",
                "string.min": "The url must be at least 10 characters long",
                "string.uri": "The url must be a valid url",
                "any.required": "You must type an url",
            }),
        code: Joi.string().required().trim().min(3).messages({
            "string.base": "Code must be a string",
            "string.empty": "You must type a code",
            "string.min": "The code must be at least 3 characters long",
            "any.required": "You must type a code",
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
