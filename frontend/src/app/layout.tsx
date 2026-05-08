import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/shared/navbar"
import { ThemeProvider } from "@/components/providers/theme-provider"

import { Toaster } from "sonner"

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
      <body className="min-h-screen bg-background text-foreground antialiased">

        <ThemeProvider>

          <Navbar />

          <main>
            {children}
          </main>

          <Toaster
            richColors
            position='top-center'
            closeButton
            duration={3000}
            theme="system"
          />

        </ThemeProvider>
      </body>
    </html>
  )
}