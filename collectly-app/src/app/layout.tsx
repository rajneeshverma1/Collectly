import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { IBM_Plex_Sans } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collectly | AI Billing Automation for B2B",
  description: "Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish.",
};

import { ClerkProvider } from "@/lib/auth-wrapper";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${ibmPlexSans.variable} font-sans antialiased`}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
