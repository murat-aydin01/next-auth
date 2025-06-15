import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kayra Admin Panel",
  description: "Kayra Admin Panel - Yönetim Arayüzü",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 py-2 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Header />
        </SessionProvider>
        {children}
      </body>
    </html>
  );
}
