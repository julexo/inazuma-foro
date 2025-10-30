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
    <html lang="es"> 
      <head>
        <meta name="apple-mobile-web-app-title" content="VRF" />
       
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Analytics /> 
        </AuthProvider>
        
      </body>
    </html>
  );
}