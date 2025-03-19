import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import TanstackClientProvider from '@/components/providers/tanstack-client-provider'
import ClerkClientProvider from '@/components/providers/clerk-client-provider'
import { BackgroundCells } from '@/components/ui/background-cells'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'SaaSSystems.io - AI-First Micro SaaS Platform',
  description: 'Launch your AI-powered Micro SaaS business with our cutting-edge platform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundCells className="bg-slate-950">
          <ClerkClientProvider>
            <TanstackClientProvider>{children}</TanstackClientProvider>
          </ClerkClientProvider>
        </BackgroundCells>
      </body>
    </html>
  )
}
