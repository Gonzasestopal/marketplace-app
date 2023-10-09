import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Products Marketplace',
  description: 'Find your next gift here!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full bg-white" lang="en">
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  )
}
