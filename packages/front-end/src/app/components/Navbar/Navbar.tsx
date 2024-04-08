"use client";
import Image from "next/image";
import Link from "next/link";

// COMPONENTS
import { ToggleTheme } from '../../components/ToggleTheme/ToggleTheme';

// HOOKS
import useScroll from "../../hooks/use-scroll";

// NAVBAR COMPONENT
export const Navbar = () => {
  /* Hooks */
  const scrolled = useScroll(50);

  /* Vars */
  const variableStyles = scrolled ? "backdrop-blur-xl border-b border-light-border bg-light-background/50 dark:bg-dark-background dark:border-dark-border": "bg-white/0"

  /* Renders */
  return (
    <nav className={`${variableStyles} fixed top-0 w-full flex justify-center z-30 transition-all`}>
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            className="text-white"
            src="/images/logo.svg"
            alt="Short Links"
            width={40}
            height={40}
          />
          <p className="text-light-title dark:text-dark-title">My Link In</p>
        </Link>

        <div className="flex gap-4 items-center">
          <a href="/#about" className="text-lg text-light-text dark:text-dark-text hover:opacity-65 transition-all duration-300">
            About
          </a>

          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
}
