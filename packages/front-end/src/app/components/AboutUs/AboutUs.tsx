// ABOUT US COMPONENT
export const AboutUs = () => {
    /* Renders */
    return (
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up gap-4">
            <h2
                className="mt-2 animate-fade-up bg-gradient-to-br from-stone-900 to-stone-500 bg-clip-text text-center font-bold font-display text-3xl text-transparent drop-shadow-sm md:text-5xl md:leading-[3rem]"
                style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
                About Us
            </h2>

            <p className="text-zinc-700">
                In a digital world where ease and security in sharing information are paramount, <span className="font-bold underline">MyLinkIn</span> emerged as an innovative solution. Our mission? To provide you with an easy and secure way to share shortened and customized links. We understand how important it is to keep these links active and functional over time, removing any worries about their future inaccessibility.
            </p>

            <p className="text-zinc-700">
                Developed with the latest technologies and adhering to the best practices in web development, <span className="font-bold underline">MyLinkIn</span> stands out for its fast API and a streamlined interface. Our design is intuitive, ensuring you can create and share your links with ease, regardless of the device used.
            </p>
        </div>
    );
}
