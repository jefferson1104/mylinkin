"use client";
import { FormEvent, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import Joi from "joi";

// COMPONENTS
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";

// UTILS
import { errorAlert } from "@/utils/alert-notification";
import { formValidations, IFieldError } from "@/utils/form-validation";

// FORM COMPONENT UTILS
export interface IForm {
    inputUrlPlaceholder: string;
    inputCodePlaceholder: string;
    buttonText: string;
    successMessage: string;
    copyMessage: string;
    fieldsValidationMessages: {
        url: {
            stringBase: string;
            stringEmpty: string;
            stringMin: string;
            stringUri: string;
            anyRequired: string;
        },
        code: {
            stringBase: string;
            stringEmpty: string;
            stringMin: string;
            stringMax: string;
            anyRequired: string;
        };
    }
}

export interface IFormValues {
    code: string;
    url: string;
}

export const initialValues = {
    code: "",
    url: "",
}

// FORM COMPONENT
export const Form = ({
    inputUrlPlaceholder,
    inputCodePlaceholder,
    buttonText,
    successMessage,
    copyMessage,
    fieldsValidationMessages,
}: IForm) => {
    /* States */
    const [formValues, setFormValues] = useState<IFormValues>(initialValues);
    const [fieldError, setFieldError] = useState<IFieldError>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [shortenedLink, setShortenedLink] = useState('');

    /* Handlers */
    const inputChangeHandler = async (field: string, value: string) => {
        if (field === 'code') {
            setFormValues((values) => ({ ...values, [field]: value.toUpperCase() }));
            return;
        }

        setFormValues((values) => ({ ...values, [field]: value }));
    };

    const copyHandler = (link: string) => {
        navigator.clipboard.writeText(link).then(() => {
            setIsCopy(true);
        }).catch(err => {
            console.error('Error copy: ', err);
            errorAlert({
                description: "Error to copy"
            });
        });
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (isLoading) {
            return;
        };

        const errors = formValidations(formValues, fieldsValidationSchema);
        if (Object.keys(errors).length) {
            setFieldError(errors);
            return;
        };

        setFieldError({});

        try {
            setIsLoading(true);

            const data = {
                code: formValues.code.toUpperCase(),
                url: formValues.url
            };

            const parsedData = JSON.stringify(data);
            const baseUrl = process.env.NEXT_PUBLIC_API;
            const endpoint = `${baseUrl}/api/links`;

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: parsedData
            };

            const response = await fetch(endpoint, options);

            if (response.status === 201) {
                setShortenedLink(`mylinkin.com/${formValues.code}`);
                setIsOpenModal(true);
                setFormValues(initialValues);
                return;
            };

            if (response.status === 400) {
                const errorResponse = await response.json();
                errorAlert({
                    description: errorResponse.message,
                });
                return;
            };

            errorAlert({
                description: "Unexpected error. Try again"
            });
        } catch (error) {
            console.error('Create Short Link Error: ', error);
            errorAlert({
                description: 'Internal server error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    /* Utils */
    const fieldsValidationSchema = {
        url: Joi.string().required().trim().uri().min(3).messages({
            "string.base": fieldsValidationMessages.url.stringBase,
            "string.empty": fieldsValidationMessages.url.stringEmpty,
            "string.min": fieldsValidationMessages.url.stringMin,
            "string.uri": fieldsValidationMessages.url.stringUri,
            "any.required": fieldsValidationMessages.url.anyRequired,
        }),
        code: Joi.string().required().trim().min(3).max(10).messages({
            "string.base": fieldsValidationMessages.code.stringBase,
            "string.empty": fieldsValidationMessages.code.stringEmpty,
            "string.min": fieldsValidationMessages.code.stringMin,
            "string.max": fieldsValidationMessages.code.stringMax,
            "any.required": fieldsValidationMessages.code.anyRequired,
        }),
    };

    /* LifeCycles */
    useEffect(() => {
        if(isCopy) {
            setTimeout(() => {
                setIsCopy(false);
            }, 3000);
        }
    }, [isCopy]);

    /* Renders */
    return(
        <>
            <form onSubmit={submitHandler} className="animate-fade-up flex flex-col justify-center items-center">
                <div className="flex justify-center items-start flex-col xl:flex-row gap-4">
                    <Input
                        customClassName="w-64 lg:w-96 xl:w-72"
                        placeholder={inputUrlPlaceholder}
                        id="createUrl"
                        name="url"
                        type="url"
                        value={formValues.url}
                        errorMessage={fieldError?.url}
                        onChange={(e) =>
                            inputChangeHandler("url", e.target.value)
                        }
                    />

                    <Input
                        customClassName="w-64 lg:w-96 xl:w-44"
                        placeholder={inputCodePlaceholder}
                        id="createCode"
                        name="code"
                        type="text"
                        value={formValues.code}
                        errorMessage={fieldError?.code}
                        onChange={(e) =>
                            inputChangeHandler("code", e.target.value)
                        }
                    />

                    <Button
                        id="createLinkButton"
                        aria-label="create link"
                        customClassName="xl:w-32"
                        text={buttonText}
                        type="submit"
                        isLoading={isLoading}
                    />
                </div>
            </form>

            <Modal showModal={isOpenModal} setShowModal={setIsOpenModal}>
                <div className="p-8 h-48 md:h-40 flex flex-col items-center gap-4">
                    <h2 className="text-center font-bold text-lg text-cyan-600">{successMessage}</h2>

                    <div className="flex items-center gap-4">
                        <p className="text-center border px-2 py-1 rounded-lg text-zinc-700 border-zinc-300 bg-gradient-to-b from-zinc-50 to-zinc-100">
                            <code className="font-mono font-bold">{shortenedLink}</code>
                        </p>
                        <button onClick={() => copyHandler(shortenedLink)}>
                            <Copy className="hover:bg-zinc-400 bg-zinc-200 p-2 rounded-md size-9 transition-all duration-300" />
                        </button>
                    </div>

                    {isCopy && (
                        <span className="text-cyan-500 text-sm">
                            {copyMessage}
                        </span>
                    )}
                </div>
            </Modal>
        </>
    );
}
