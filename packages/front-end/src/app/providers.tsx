'use client';
import { ReactNode } from "react";

// CONTEXTS
import { LinksProvider } from "./contexts/links-context";
import { ThemeProvider } from './contexts/theme-context';

// PROVIDERS UTILS
interface IProviders {
  children: ReactNode;
};

// PROVIDERS
export function Providers({ children }: IProviders) {
  return (
    <ThemeProvider>
      <LinksProvider>
        {children}
      </LinksProvider>
    </ThemeProvider>
  );
}
