"use client";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import {Outfit} from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const params = usePathname(); // ✅ Corrected variable name
  const showHeader = params === "/sign-in"|| params === "/create-account"?false:true; // ✅ Corrected condition

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showHeader && <Header />} {/* ✅ Header is now conditionally rendered correctly */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
