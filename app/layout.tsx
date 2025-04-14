import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import type React from "react"
import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A modern expense tracker application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex h-screen">
              <SignedIn>
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <header className="flex justify-end items-center p-4 h-16">
                    <UserButton afterSignOutUrl="/" />
                  </header>
                  <main className="flex-1 overflow-y-auto p-8">
                    {children}
                  </main>
                </div>
              </SignedIn>
              
              <SignedOut>
  <div className="flex items-center justify-center w-full h-screen bg-muted">
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl font-bold text-center">Expense Tracker</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Sign in to access your dashboard
        </p>
        <div className="flex gap-4 justify-center">
          <SignInButton mode="modal">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </CardContent>
    </Card>
  </div>
</SignedOut>

            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}