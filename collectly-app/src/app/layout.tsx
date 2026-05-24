import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mavenFont = localFont({
  src: "./fonts/maven-font.woff2",
  variable: "--font-maven",
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
        <body className={`${mavenFont.variable} font-sans antialiased`}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
