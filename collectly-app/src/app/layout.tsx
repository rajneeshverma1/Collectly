import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Collectly | AI Billing Automation for B2B",
  description: "Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish.",
  openGraph: {
    title: "Collectly | AI Billing Automation for B2B",
    description: "Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish.",
    url: "https://collectly.io",
    siteName: "Collectly",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Collectly - AI Billing Automation for B2B",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collectly | AI Billing Automation for B2B",
    description: "Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish.",
    images: ["/images/og.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
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
        <body className="font-sans antialiased">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
