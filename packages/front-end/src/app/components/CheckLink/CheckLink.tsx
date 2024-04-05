"use client";
import { FormEvent, useState } from "react";
import Joi from "joi";

// COMPONENTS
import { Card } from "../Card/Card"
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

// UTILS
import { IFieldError, formValidations } from "@/app/utils/form-validation";
import { errorAlert } from "@/app/utils/alert-notification";
import { ILinkMetric } from "@/app/interfaces/link";
import { formatDayMonthYear } from "@/app/utils/date";

// CHECK LINK COMPONENT UTILS
interface ICheckLinkForm {
    code: string;
}

export const initialValues = {
    code: "",
}

// CHECK LINK COMPONENT
export const CheckLink = () => {
    /* States */
    const [formValues, setFormValues] = useState<ICheckLinkForm>(initialValues);
    const [fieldError, setFieldError] = useState<IFieldError>({});
    const [isLoading, setIsLoading] = useState(false);
    const [linkMetrics, setLinkMetrics] = useState<ILinkMetric>();

    /* Handlers */
    const inputChangeHandler = async (field: string, value: string) => {
        setFormValues((values) => ({ ...values, [field]: value }));
    };

    const getLinkMetricsHandler = async (e: FormEvent) => {
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
            };

            const parsedData = JSON.stringify(data);
            const baseUrl = process.env.NEXT_PUBLIC_API;
            const endpoint = `${baseUrl}/api/metrics`;

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: parsedData
            };

            const response = await fetch(endpoint, options);

            if (response.status === 200) {
                const data: ILinkMetric = await response.json();
                setLinkMetrics(data);
                return;
            }

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
            console.error('Get Link Metrics Error: ', error);
            errorAlert({
                description: 'Internal server error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    /* Utils */
    const fieldsValidationSchema = {
        code: Joi.string().required().trim().min(3).max(10).messages({
            "string.base": "Must be a string",
            "string.empty": "Must type a code",
            "string.min": "At least 3 characters",
            "string.max": "Max 10 characters",
            "any.required": "Must type a code",
        }),
    };

    const renderLinkMetricsForm = (
        <form onSubmit={getLinkMetricsHandler}>
            <div className="flex flex-col justify-center items-start gap-4">
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
                    text="Create"
                    type="submit"
                    isLoading={false}
                />
            </div>
        </form>
    );

    const renderLinkMetrics = () => {
        const linkCreatedAt = new Date(linkMetrics!.created_at);
        const formattedDate = linkMetrics && formatDayMonthYear(linkCreatedAt, 'US')
        return (
            <div className="rounded-md bg-zinc-50 p-4 text-sm max-w-sm break-words flex flex-col gap-2">
                <p className="font-bold">Created at: <span className="font-normal">{formattedDate}</span></p>
                <p className="font-bold">Clicks: <span className="font-normal">{linkMetrics?.clicks}</span></p>
                <p className="font-bold">Code: <span className="font-normal">{linkMetrics?.code}</span></p>
                <p className="font-bold">Original URL: <span className="font-normal">{linkMetrics?.original_url}</span></p>
            </div>
        );
    }

    /* Renders */
    return (
        <Card
            title="Your Link"
            description="How many clicks it got, original URL,and when it was created."
            component={
                linkMetrics ? renderLinkMetrics() : renderLinkMetricsForm
            }
        />
    )
}
