import { Metadata } from 'next'
import { DashboardLayout } from '@/components/dashboard-layout'

export const metadata: Metadata = {
  title: 'Transform Your Images',
  description:
    'AI-powered image transformation for YouTube thumbnails, memes, and professional photos',
}

export default function TransformLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
