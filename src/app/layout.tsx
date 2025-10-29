import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/react"; // <-- Paso 2.1: Importa Analytics

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victory Road Foro", // <-- Actualiza tu título
  description: "Foro para crear y discutir alineaciones de Inazuma Eleven", // <-- Actualiza tu descripción
  // No necesitas 'icons: null' si usas el método de archivos en /app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Cambiado a 'es' */}
      <head>
        {/* Aquí van tus meta tags y links de favicon generados */}
        <meta name="apple-mobile-web-app-title" content="VRF" />
        {/* ... (otras etiquetas <link> y <meta> si las tienes) ... */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics /> {/* <-- Paso 2.2: Añade el componente aquí */}
      </body>
    </html>
  );
}