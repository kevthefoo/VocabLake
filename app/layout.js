import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  isLoaded,
} from "@clerk/nextjs";
import "./globals.css";
import { neobrutalism } from "@clerk/themes";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import {
  StructuredData,
  generateWebsiteSchema,
  generateEducationalOrganizationSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "VocabLake - Dive Deep into Vocabulary Learning",
    template: "%s | VocabLake",
  },
  description:
    "Discover, learn, and master new vocabulary with VocabLake. AI-powered definitions, examples, and personalized learning to expand your word knowledge.",
  keywords: [
    "vocabulary",
    "learning",
    "education",
    "words",
    "dictionary",
    "AI",
    "language",
    "study",
    "english",
  ],
  authors: [{ name: "VocabLake Team" }],
  creator: "VocabLake",
  publisher: "VocabLake",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vocablake.com",
    siteName: "VocabLake",
    title: "VocabLake - Dive Deep into Vocabulary Learning",
    description:
      "Discover, learn, and master new vocabulary with VocabLake. AI-powered definitions, examples, and personalized learning to expand your word knowledge.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VocabLake - Vocabulary Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VocabLake - Dive Deep into Vocabulary Learning",
    description:
      "Discover, learn, and master new vocabulary with VocabLake. AI-powered definitions, examples, and personalized learning.",
    images: ["/og-image.png"],
    creator: "@vocablake",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <head>
          <StructuredData schema={generateWebsiteSchema()} />
          <StructuredData schema={generateEducationalOrganizationSchema()} />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col antialiased`}
        >
          <Toaster richColors visibleToasts={1} />
          <header>
            <Navbar />
          </header>
          <main className="h-full">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
