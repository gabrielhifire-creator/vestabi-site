import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://www.vestabi.com";
const title = "Vesta | Inteligência operacional aplicada";
const socialDescription = "Menos retrabalho. Mais clareza para operar.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description:
    "Diagnóstico, organização de dados, automação assistida e monitoramento para reduzir retrabalho e apoiar decisões de gestão.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: "/vesta-logo-light.png",
    shortcut: "/vesta-logo-light.png",
    apple: "/vesta-logo-light.png",
  },
  openGraph: {
    title,
    description: socialDescription,
    type: "website",
    locale: "pt_BR",
    url: `${siteUrl}/`,
    siteName: "Vesta",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vesta - Menos retrabalho. Mais clareza para operar.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={geistSans.variable}>{children}</body>
    </html>
  );
}
