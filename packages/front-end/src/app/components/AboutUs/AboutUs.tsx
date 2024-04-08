"use client";

// CONTEXTS
import { useTheme } from "@/app/contexts/theme-context";

// ABOUT US COMPONENT
export const AboutUs = () => {
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
                About Us
            </h2>

            <p className="text-light-text">
                In a digital world where ease and security in sharing information are paramount, <span className="font-bold underline">MyLinkIn</span> emerged as an innovative solution. Our mission? To provide you with an easy and secure way to share shortened and customized links. We understand how important it is to keep these links active and functional over time, removing any worries about their future inaccessibility.
            </p>

            <p className="text-light-text">
                Developed with the latest technologies and adhering to the best practices in web development, <span className="font-bold underline">MyLinkIn</span> stands out for its fast API and a streamlined interface. Our design is intuitive, ensuring you can create and share your links with ease, regardless of the device used.
            </p>
        </div>
    );
}
