import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertifiedTranslatorPros - Certified Translations You Can Trust",
  description: "USCIS-ready certified translations by human translators. Fast, reliable, and secure. Get your documents translated in 24-48 hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
