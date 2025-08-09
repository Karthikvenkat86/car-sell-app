import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingChat from '@/components/FloatingChat'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'green Carz - Sell Your Car Fast',
  description: 'green Carz: Get instant cash for your car. Upload photos, get an estimate, and receive immediate payment after inspection.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
        <FloatingChat />
      </body>
    </html>
  )
}
