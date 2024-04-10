import { InputHTMLAttributes } from "react";

// INPUT COMPONENT INTERFACES
interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    name?: string;
    errorMessage?: string;
    customClassName?: string;
}

// INPUT COMPONENT
export const Input = ({ id, name, errorMessage, customClassName, ...props }: IInput) => {
    /* Vars */
    const variableStyles = !!errorMessage
        ? "border-red-700 hover:ring-red-600 focus-visible:ring-red-600"
        : "ring-zinc-700";

    /* Renders */
    return (
        <div className="relative">
            <input
                className={`${customClassName} ${variableStyles} block p-2 h-10 text-sm border border-light-border dark:border-dark-border rounded-lg outline-none bg-transparent text-light-title dark:text-dark-title placeholder-light-placeholder dark:placeholder-dark-placeholder hover:ring-2 focus-visible:ring-2 transition-all duration-300`}
                id={id}
                name={name}
                {...props}
            />

            <p className="text-sm text-red-700 font-medium">
                {!!errorMessage && errorMessage}
            </p>
        </div>
    );
};
