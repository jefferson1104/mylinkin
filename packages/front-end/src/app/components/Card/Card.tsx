"use client"
import { ReactNode } from "react";

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
    /* Renders */
    return (
        <div className={`p-2 animate-fade-up relative col-span-1 h-[420px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${large ? "xl:col-span-2" : ""}`}>
            <div className="flex h-60 items-center justify-center">
                {component}
            </div>
            <div className="mx-auto max-w-md text-center">
                <h2 className="bg-gradient-to-br from-stone-900 to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
                    {title}
                </h2>
                <div className="text-sm md:text-base mt-3 leading-normal text-zinc-500 [text-wrap:balance] md:prose">
                    {description}
                </div>
            </div>
        </div>
    );
}
