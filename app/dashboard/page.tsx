'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Upload, Image as ImageIcon, Youtube, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard-layout'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Transform Your Images</h1>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                YouTube Thumbnails
              </CardTitle>
              <CardDescription>
                Create eye-catching thumbnails that drive clicks and views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-center justify-center rounded-md bg-slate-100">
                <ImageIcon className="h-10 w-10 text-slate-400" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/transform/youtube">Create Thumbnail</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Meme Generator
              </CardTitle>
              <CardDescription>
                Transform your photos into shareable memes with custom text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-center justify-center rounded-md bg-slate-100">
                <ImageIcon className="h-10 w-10 text-slate-400" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/transform/meme">Create Meme</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-green-500" />
                Professional Images
              </CardTitle>
              <CardDescription>
                Enhance your photos with professional-quality adjustments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-center justify-center rounded-md bg-slate-100">
                <ImageIcon className="h-10 w-10 text-slate-400" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/transform/professional">Enhance Photo</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transformations</CardTitle>
            <CardDescription>View and manage your recently transformed images.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 flex-col items-center justify-center rounded-md border-2 border-dashed">
              <p className="mb-2 text-muted-foreground">No recent transformations</p>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload an image to get started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
