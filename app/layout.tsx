import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-gotham",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Weight Management Movement",
  description: "Helping you not only lose the weight, but keep it off for life.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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

