import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const collectlyFont = localFont({
  src: "./fonts/collectly-font.woff2",
  variable: "--font-collectly",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collectly | Billing Automation for B2B",
  description: "Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish.",
};

import { MaintenanceBar } from "@/components/maintenance-bar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${collectlyFont.variable} font-sans antialiased`}>
        <AuthProvider>
          <MaintenanceBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
