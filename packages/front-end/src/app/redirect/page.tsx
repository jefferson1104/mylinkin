"use client"
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

// REDIRECT PAGE UTILS
interface IRedirectPage {
  code: string;
}

// REDIRECT PAGE
export default function Redirect({ code }: IRedirectPage) {
  /* Vars */
  const baseURL = process.env.NEXT_PUBLIC_API;

  /* LifeCycles */
  useEffect(() => {
    if (baseURL && code) {
      window.location.href = `${baseURL}/${code}`;
    }
  }, [baseURL, code]);

  /* Renders */
  return (
    <div className="z-10 flex justify-center items-center gap-2 h-screen w-full">
      <p className="z-10 text-cyan-600 text-xl">Wait you will be redirected...</p>
      <LoaderCircle className="animate-spin size-12 text-cyan-600" />
    </div>
  );
}