import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://blossom.voidwarelabs.in",
  ),
  title: "Blossom — Launching Soon",
  description: "Blossom by VoidwareLabs. Launching soon.",
  applicationName: "Blossom",
  icons: {
    // Exact Figma logo node 16:121 (floral bg + white mark)
    icon: [{ url: "/coming-soon/logo.png", type: "image/png", sizes: "300x300" }],
    apple: [{ url: "/coming-soon/logo.png", sizes: "300x300" }],
    shortcut: "/coming-soon/logo.png",
  },
  // Figma URL banner node 22:190 (1200×400)
  openGraph: {
    title: "Blossom — Launching Soon",
    description: "Blossom by VoidwareLabs. Launching soon.",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 400,
        alt: "Blossom",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blossom — Launching Soon",
    description: "Blossom by VoidwareLabs. Launching soon.",
    images: ["/og-banner.png"],
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
