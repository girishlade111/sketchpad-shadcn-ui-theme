import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sketchpad.example.com"),
  title: {
    default: "Sketchpad - Modern UI Theme | shadcn/ui Next.js",
    template: "%s | Sketchpad - shadcn/ui Theme",
  },
  description: "A modern, responsive web application built with Next.js 14, React 18, Tailwind CSS 4, and shadcn/ui components. Features dark/light mode, accessibility-first design, and premium UI components.",
  keywords: [
    "Next.js",
    "React",
    "shadcn/ui",
    "Tailwind CSS",
    "UI components",
    "web development",
    "modern UI",
    "responsive design",
    "TypeScript",
    "dark mode",
    "light mode",
    "accessibility",
    "Radix UI",
  ],
  authors: [{ name: "Sketchpad" }],
  creator: "Sketchpad",
  publisher: "Sketchpad",
  generator: "Next.js",
  applicationName: "Sketchpad",
  referrer: "origin-when-cross-origin",
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
    url: "https://sketchpad.example.com",
    siteName: "Sketchpad",
    title: "Sketchpad - Modern UI Theme | shadcn/ui Next.js",
    description: "A modern, responsive web application built with Next.js 14, React 18, Tailwind CSS 4, and shadcn/ui components. Features dark/light mode, accessibility-first design, and premium UI components.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sketchpad - Modern UI Theme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketchpad - Modern UI Theme | shadcn/ui Next.js",
    description: "A modern, responsive web application built with Next.js 14, React 18, Tailwind CSS 4, and shadcn/ui components.",
    creator: "@sketchpad",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://sketchpad.example.com",
    languages: {
      en: "https://sketchpad.example.com",
    },
  },
  category: "technology",
  classification: "Web Application",
  manifest: "/manifest.json",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense>{children}</Suspense>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}