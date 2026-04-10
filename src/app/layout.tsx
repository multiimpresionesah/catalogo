import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi Impresiones AH | Impresiones de Alta Calidad",
  description:
    "Tu mejor opción en impresiones. Banners, camisas, tazas, facturas y más. Personaliza todo con tu logo o diseño. Envío a domicilio disponible.",
  keywords: "impresiones, banners, tazas personalizadas, camisas, facturas, sublimación, serigrafía, El Salvador",
  openGraph: {
    title: "Multi Impresiones AH",
    description: "Impresiones de alta calidad para tu negocio",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-mi/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-mi/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-mi/favicon.ico" },
    ],
    apple: "/favicon-mi/apple-touch-icon.png",
  },
  manifest: "/favicon-mi/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
