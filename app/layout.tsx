import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Reviw — Turn happy customers into 5-star Google reviews";
const DESCRIPTION =
  "Reviw helps local businesses collect quick customer feedback and automatically send delighted customers to leave Google reviews, while routing unhappy customers to private feedback first.";

export const metadata: Metadata = {
  metadataBase: new URL("https://reviw.app"),
  title: {
    default: TITLE,
    template: "%s · Reviw",
  },
  description: DESCRIPTION,
  keywords: [
    "Google reviews",
    "reputation management",
    "customer feedback software",
    "local business reviews",
    "review generation",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://reviw.app",
    siteName: "Reviw",
    locale: "en_US",
    type: "website",
    // TODO: add a dedicated 1200x630 OG image once one is designed —
    // omitted for now rather than guessing at a wrong-sized asset.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#12151b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
