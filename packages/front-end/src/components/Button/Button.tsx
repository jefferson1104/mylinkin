"use client";
import { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

// BUTTON COMPONENT INTERFACES
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: String;
    isLoading?: boolean;
    customClassName?: string;
}

// BUTTON COMPONENT
export const Button = ({ text, isLoading, customClassName, ...props }: IButton) => {
    /* Renders */
    return (
        <button
            className={`${customClassName} flex gap-2 items-center justify-center w-full p-2 h-10 rounded-md outline-none text-sm text-center border border-zinc-700 bg-zinc-700 text-zinc-50 hover:bg-zinc-200 hover:text-zinc-700 ring-zinc-500 focus-visible:ring-2 hover:ring-2 transition-all duration-300`}
            {...props}
        >
            {!isLoading && text}

            {isLoading && (
                <>
                    <LoaderCircle
                        className="size-5 animate-spin"
                    />
                    <p>Loading</p>
                </>
            )}
        </button>
    );
}
