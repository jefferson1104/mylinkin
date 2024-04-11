"use client";
import { useState } from "react";
import Joi from "joi";

// COMPONENTS
import { Card } from "@/components/Card/Card"
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

// UTILS
import { IFieldError, formValidations } from "@/utils/form-validation";
import { errorAlert } from "@/utils/alert-notification";
import { ILinkMetric } from "@/interfaces/link";
import { formatDayMonthYear } from "@/utils/date";

// METRICS LINK COMPONENT UTILS
interface IMetricsLink {
    title: string;
    description: string;
    buttonText: string;
    buttonText2: string;
    createdAt: string;
    clicks: string;
    code: string;
    originalUrl: string;
};

interface IMetricsLinkForm {
    code: string;
};

export const initialValues = {
    code: "",
};

// METRICS LINK COMPONENT
export const MetricsLink = ({
    title,
    description,
    buttonText,
    buttonText2,
    createdAt,
    clicks,
    code,
    originalUrl
}: IMetricsLink) => {
    /* States */
    const [formValues, setFormValues] = useState<IMetricsLinkForm>(initialValues);
    const [fieldError, setFieldError] = useState<IFieldError>({});
    const [isLoading, setIsLoading] = useState(false);
    const [linkMetrics, setLinkMetrics] = useState<ILinkMetric | null>(null);

    /* Handlers */
    const inputChangeHandler = async (field: string, value: string) => {
        setFormValues((values) => ({ ...values, [field]: value }));
    };

    const getLinkMetricsHandler = async () => {
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

    const clearMetricsHandler = () => {
        setLinkMetrics(null);
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
        <div className="flex flex-col justify-center items-start gap-4">
            <Input
                customClassName="w-64 lg:w-96 xl:w-44"
                placeholder="CODE"
                id="checkCode"
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
                id="checkLinkButton"
                aria-label="check link"
                type="button"
                text={buttonText}
                onClick={getLinkMetricsHandler}
                isLoading={isLoading}
            />
        </div>
    );

    const renderLinkMetrics = () => {
        const linkCreatedAt = new Date(linkMetrics!.created_at);
        const formattedDate = linkMetrics && formatDayMonthYear(linkCreatedAt, 'US');

        return (
            <div className="flex flex-col gap-2">
                <div className="rounded-md border border-cyan-100 dark:border-dark-border bg-cyan-50 dark:bg-light-text text-light-text dark:text-dark-text p-4 text-sm max-w-sm break-words flex flex-col gap-2">
                    <p className="font-bold">{createdAt}: <span className="font-normal">{formattedDate}</span></p>
                    <p className="font-bold">{clicks}: <span className="font-normal">{linkMetrics?.clicks}</span></p>
                    <p className="font-bold">{code}: <span className="font-normal">{linkMetrics?.code}</span></p>
                    <p className="font-bold">{originalUrl}: <span className="font-normal">{linkMetrics?.original_url}</span></p>
                </div>

                <Button type="button" text={buttonText2} onClick={clearMetricsHandler}  />
            </div>
        );
    }

    /* Renders */
    return (
        <Card
            title={title}
            description={description}
            component={
                linkMetrics ? renderLinkMetrics() : renderLinkMetricsForm
            }
        />
    )
}
