import Joi from "joi";

export interface IFieldError {
    [key: string]: string;
}

export const formValidations = (formValues: Object, fieldsValidationSchema: Object) => {
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
