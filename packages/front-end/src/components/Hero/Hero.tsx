'use client';
import Image from "next/image";

// CONTEXTS
import { useTheme } from "@/contexts/theme-context";

// HERO COMPONENT UTILS
interface IHero {
    title: string;
    description: string;
    developer: string;
}

// HERO COMPONENT
export const Hero = ({ title, description, developer }: IHero) => {
    /* Hooks */
    const { theme } = useTheme();

    /* Vars */
    const titleStyles = theme === 'dark' ? 'bg-gradient-to-br from-stone-300 to-stone-600' : 'bg-gradient-to-br from-stone-900 to-stone-500';

    /* Renders */
    return (
        <div className="w-full max-w-xl px-5 xl:px-0">
            <a
                href="https://soaresdev.com"
                target="_blank"
                rel="noreferrer"
                className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-dark-text dark:bg-light-text px-7 py-2 transition-all duration-300 hover:opacity-65"
            >
                <Image
                    src="/images/soaresdev.svg"
                    alt="soaresdev logo"
                    width={20}
                    height={20}
                />
                <p className="text-sm font-semibold text-light-text dark:text-dark-text">
                    {developer}
                </p>
            </a>

            <h1
                className={`mt-2 animate-fade-up bg-clip-text ${titleStyles} text-center font-bold font-display text-3xl text-transparent drop-shadow-sm md:text-5xl md:leading-[3rem]`}
                style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
                {title}
            </h1>

            <p className="mt-4 text-sm md:text-base text-center text-light-text animate-fade-up">
                <span className="font-bold underline">MyLinkIn</span> {description}
            </p>
        </div>
    );
}
