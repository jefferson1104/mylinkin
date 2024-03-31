"use client";
import Image from "next/image";
import Link from "next/link";

// HOOKS
import useScroll from "../../hooks/use-scroll";

// NAVBAR COMPONENT
export const Navbar = () => {
  /* Hooks */
  const scrolled = useScroll(50);

  /* Vars */
  const variableStyles = scrolled ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl": "bg-white/0"

  /* Renders */
  return (
    <nav className={`${variableStyles} fixed top-0 w-full flex justify-center z-30 transition-all`}>
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            src="/logo.svg"
            alt="Short Links"
            width={40}
            height={40}
          />
          <p>My Link In</p>
        </Link>

        <div>
          <a href="/#about" className="text-lg text-zinc-500 hover:text-zinc-300 transition-all duration-300">
            About
          </a>
        </div>
      </div>
    </nav>
  );
}
