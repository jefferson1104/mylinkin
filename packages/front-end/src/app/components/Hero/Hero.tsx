'use client';
import Image from "next/image";

// HERO COMPONENT
export const Hero = () => {
    /* Renders */
    return (
        <section className="w-full max-w-xl px-5 xl:px-0">
            <a
            href="https://soaresdev.com"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-stone-300 px-7 py-2 transition-all duration-300 hover:bg-stone-200"
            >
                <Image
                    src="/images/soaresdev.svg"
                    alt="Short Links"
                    width={20}
                    height={20}
                />
                <p className="text-sm font-semibold text-stone-600">
                    Developed By SoaresDev
                </p>
            </a>

            <h1
                className="mt-2 animate-fade-up bg-gradient-to-br from-stone-900 to-stone-500 bg-clip-text text-center font-bold font-display text-3xl text-transparent drop-shadow-sm md:text-5xl md:leading-[3rem]"
                style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
                Create and customize your own shortened link
            </h1>

            <p className="mt-4 text-sm md:text-base text-center text-zinc-500 animate-fade-up">
                <span className="font-bold underline">MyLinkIn</span> offers a straightforward solution for creating shortened links. With our platform, you can easily customize your links, share them effortlessly with others, and track the number of clicks they receive.
            </p>
        </section>
    );
}
