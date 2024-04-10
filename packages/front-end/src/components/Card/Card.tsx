"use client"
import { ReactNode } from "react";

// CONTEXTS
import { useTheme } from "@/contexts/theme-context";

// CARD COMPONENT INTERFACES
export interface ICard {
    title: string;
    description: string;
    component?: ReactNode;
    large?: boolean;
}

// CARD COMPONENT
export const Card = ({
    title,
    description,
    component,
    large,
}: ICard) => {
    /* Hooks */
    const { theme } = useTheme();

    /* Vars */
    const titleStyles = theme === 'dark' ? 'bg-gradient-to-br from-stone-300 to-stone-600' : 'bg-gradient-to-br from-stone-900 to-stone-500';

    /* Renders */
    return (
        <div className={`p-2 animate-fade-up relative col-span-1 h-[420px] overflow-hidden rounded-xl border border-light-border bg-light-background dark:border-dark-border dark:bg-dark-background shadow-xl ${large ? "xl:col-span-2" : ""}`}>
            <div className="flex h-60 items-center justify-center">
                {component}
            </div>
            <div className="mx-auto max-w-md text-center">
                <h2 className={`bg-clip-text ${titleStyles} font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal`}>
                    {title}
                </h2>
                <div className="text-sm md:text-base mt-3 leading-normal text-light-text [text-wrap:balance] md:prose">
                    {description}
                </div>
            </div>
        </div>
    );
}
