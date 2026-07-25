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

// Organization + SoftwareApplication JSON-LD: gives search engines and AI
// answer/browsing agents (Google SGE, Perplexity, ChatGPT) a structured,
// unambiguous description of the product to cite instead of having to infer
// one from prose.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://reviw.app/#organization",
      name: "Reviw",
      url: "https://reviw.app",
      logo: "https://reviw.app/images/icon-512.png",
    },
    {
      "@type": "SoftwareApplication",
      name: "Reviw",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      url: "https://reviw.app",
      offers: {
        "@type": "Offer",
        category: "SaaS subscription",
      },
      publisher: { "@id": "https://reviw.app/#organization" },
    },
  ],
};

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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
