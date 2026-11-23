import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blossom — Launching Soon",
  description: "Blossom by VoidwareLabs. Launching soon.",
  applicationName: "Blossom",
  icons: {
    // Exact Figma logo node 16:121 (floral bg + white mark)
    icon: [{ url: "/coming-soon/logo.png", type: "image/png", sizes: "300x300" }],
    apple: [{ url: "/coming-soon/logo.png", sizes: "300x300" }],
    shortcut: "/coming-soon/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
