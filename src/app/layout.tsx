import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Log In ‹ OMAIS TRADES",
  description: "Login to OMAIS TRADES",
  icons: {
    icon: "/omais-logo.png",
    apple: "/omais-logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
