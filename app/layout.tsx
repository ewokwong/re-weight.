import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Montserrat } from "next/font/google"
import { SITE_DESCRIPTION } from "@/lib/constants"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-gotham",
  display: "swap",
})

export const metadata: Metadata = {
  title: "re:weight.",
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "re:weight.",
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "re:weight.",
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}

