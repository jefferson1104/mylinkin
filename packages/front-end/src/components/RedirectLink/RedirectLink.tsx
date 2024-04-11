"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export const RedirectLink = () => {
  const params = useSearchParams();

  const baseURL = process.env.NEXT_PUBLIC_API;
  const code = params.get('code');

  console.log('baseURL ==>', baseURL);
  console.log('CODE ==>', code);

  useEffect(() => {

    window.location.href = `${baseURL}/${code}`;

  }, [baseURL, code]);

  return null;
}
