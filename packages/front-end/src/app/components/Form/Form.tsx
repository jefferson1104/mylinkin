"use client";
import { FormEvent, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import Joi from "joi";

// COMPONENTS
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";

// UTILS
import { errorAlert } from "../../utils/alert-notification";
import { formValidations, IFieldError } from "../../utils/form-validation";

// FORM COMPONENT UTILS
export interface IForm {
    code: string;
    url: string;
}

export const initialValues = {
    code: "",
    url: "",
}

// FORM COMPONENT
export const Form = () => {
    /* States */
    const [formValues, setFormValues] = useState<IForm>(initialValues);
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
                setShortenedLink(`${baseUrl}/${formValues.code}`);
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
                        placeholder="https://yourlink.com"
                        id="url"
                        name="url"
                        type="url"
                        required
                        value={formValues.url}
                        errorMessage={fieldError?.url}
                        onChange={(e) =>
                            inputChangeHandler("url", e.target.value)
                        }
                    />

                    <Input
                        customClassName="w-64 lg:w-96 xl:w-44"
                        placeholder="CODE"
                        id="code"
                        name="code"
                        type="text"
                        required
                        value={formValues.code}
                        errorMessage={fieldError?.code}
                        onChange={(e) =>
                            inputChangeHandler("code", e.target.value)
                        }
                    />

                    <Button
                        customClassName="xl:w-32"
                        text="Create"
                        type="submit"
                        isLoading={isLoading}
                    />
                </div>
            </form>
            <Modal showModal={isOpenModal} setShowModal={setIsOpenModal}>
                <div className="p-8 h-48 md:h-40 flex flex-col items-center gap-4">
                    <h2 className="text-center font-bold text-lg text-cyan-600">Link created successfully</h2>

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
                            Copied !!!
                        </span>
                    )}
                </div>
            </Modal>
        </>
    );
}
