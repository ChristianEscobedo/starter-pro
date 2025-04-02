'use client'

import { ImageGenerator } from '@/components/shared/image-generator'

export default function YouTubeThumbnail() {
  return (
    <ImageGenerator
      title="YouTube Thumbnail Creator"
      description="Create eye-catching thumbnails for your YouTube videos"
      transformationType="youtube"
      promptPlaceholder="Describe your YouTube thumbnail (e.g., 'A futuristic city skyline with neon lights for my tech review video')"
      aspectRatio="video"
    />
  )
}
