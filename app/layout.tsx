import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarot Session",
  description: "Simulation d'une séance de Tarot de Marseille"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
