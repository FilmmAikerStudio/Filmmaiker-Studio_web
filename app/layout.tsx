import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import ThemeSync from "./components/common/ThemeSync";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.filmmaikerstudio.com'),
  title: "Filmmaiker Studio",
  description: "Una agencia de producción 3D, Video, e IA inmersiva.",
  keywords: "Filmmaiker Studio, Producción de Video, Agencia IA, Web 3D, Experiencias Digitales",
  authors: [{ name: "Filmmaiker Studio" }],
  creator: "Filmmaiker Studio",
  publisher: "Filmmaiker Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Filmmaiker Studio - Experiencias Inmersivas",
    description: "Una agencia de producción 3D, Video, e IA inmersiva.",
    url: "https://www.filmmaikerstudio.com",
    siteName: "Filmmaiker Studio",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmmaiker Studio - Experiencias Inmersivas",
    description: "Una agencia de producción 3D, Video, e IA inmersiva.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        <ThemeSync />
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'}/>
    </html>
  );
}
