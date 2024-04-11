import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { redirect } from 'next/navigation'
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

const sfPro = localFont({
  src: "../../../public/fonts/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const metadata: Metadata = {
  title: "MyLinkIn - Link Shortener",
  applicationName: "MyLinkIn",
  referrer: "origin",
  creator: "Jefferson Soares",
  publisher: "Jefferson Soares",
  robots: { index: true, follow: true },
  icons: ["/images/logo-light.svg", "/images/logo-light.svg"],
  metadataBase: new URL("https://mylinkin.com"),
  description:
      "The best link shortener, at MyLinIn you can shorten your links, customize and check how many clicks you got.",
  alternates: {
      canonical: "https://mylinkin.com"
  },
  appleWebApp: {
      capable: true,
      title: "MyLinkIn"
  },
  authors: [
      {
          name: "SoaresDev",
          url: "https://soaresdev.com"
      },
      {
          name: "Jefferson Soares",
          url: "https://links.soaresdev.com"
      }
  ],
  keywords: [
      "link shortener",
      "url shortner",
      "shortened url",
      "shortened links",
      "short link",
      "short url",
      "short links",
      "links analytics",
      "encurtador de links",
      "encurtar links",
      "encurtador de url",
      "encurtar url",
      "links curtos",
      "url encurtada",
      "links encurtados",
      "mylinkin",
      "my link in"
  ],
  openGraph: {
      type: "website",
      url: "https://milinkin.com",
      title: "MyLinkIn - Link Shortener",
      description: "The best link shortener, at MyLinIn you can shorten your links, customize and check how many clicks you got.",
      siteName: "MyLinkIn - Link Shortener",
      images: [
          {
            url: "/images/banner.png"
          }
      ]
  }
};
export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode,
  params: { locale: string }
}>) {
  const baseURL = process.env.NEXT_PUBLIC_API;

  if (locale.length > 2) {
    redirect(`${baseURL}/${locale}`)
  };

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${sfPro.variable}`}>
        <Providers>
          <div className="fixed h-screen w-full bg-light-background dark:bg-dark-background" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
