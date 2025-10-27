import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inazuma Foro", // Puedes ajustar el título
  description: "Foro para crear y discutir alineaciones de Inazuma Eleven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

      <head>
        <meta name="apple-mobile-web-app-title" content="VRF" />
        {/* Asegúrate de que el 'content' sea el nombre corto que quieres */}
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}