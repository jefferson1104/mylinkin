"use client";

// CONTEXTS
import { useTheme } from "@/contexts/theme-context";

// ABOUT US COMPONENT UTILS
interface IAboutUs {
    title: string;
    description: string;
    description2: string;
    description3: string;
}

// ABOUT US COMPONENT
export const AboutUs = ({ title, description, description2, description3 }: IAboutUs) => {
    /* Hooks */
    const { theme } = useTheme();

    /* Vars */
    const titleStyles = theme === 'dark' ? 'bg-gradient-to-br from-stone-300 to-stone-600' : 'bg-gradient-to-br from-stone-900 to-stone-500';

    /* Renders */
    return (
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up gap-4">
            <h2
                className={`mt-2 animate-fade-up bg-clip-text ${titleStyles} text-center font-bold font-display text-3xl text-transparent drop-shadow-sm md:text-5xl md:leading-[3rem]`}
                style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
                {title}
            </h2>

            <p className="text-light-text">
                {description}
            </p>

            <p className="text-light-text">
                {description2}
            </p>

            <p className="text-light-text">
                {description3}
            </p>
        </div>
    );
}
