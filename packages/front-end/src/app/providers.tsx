'use client';
import { ReactNode } from "react";
import { LinksProvider } from "./contexts/links-context";

interface IProviders {
  children: ReactNode;
};

export function Providers({ children }: IProviders) {
  return (
    <LinksProvider>{children}</LinksProvider>
  );
}
