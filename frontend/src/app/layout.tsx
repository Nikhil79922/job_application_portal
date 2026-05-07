import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/shared/navbar"
import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata: Metadata = {
  title: "Talent Forge",
  description: "Connecting Talent With Opportunity",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0A0A0B] text-white antialiased">
        <ThemeProvider>
          <Navbar />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}