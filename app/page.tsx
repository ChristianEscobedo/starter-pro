'use client'

import { Hero } from '@/components/ui/animated-hero'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">YouTube Thumbnails</h3>
            <p className="mb-4 text-muted-foreground">
              Create eye-catching thumbnails that drive clicks and views.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/transform/youtube" className="flex items-center justify-center gap-2">
                Try Now <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">Meme Generator</h3>
            <p className="mb-4 text-muted-foreground">
              Transform your photos into shareable memes with custom text.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/transform/meme" className="flex items-center justify-center gap-2">
                Try Now <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">Professional Images</h3>
            <p className="mb-4 text-muted-foreground">
              Enhance your photos with professional-quality adjustments.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link
                href="/transform/professional"
                className="flex items-center justify-center gap-2"
              >
                Try Now <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
