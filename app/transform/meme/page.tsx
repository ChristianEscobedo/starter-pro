'use client'

import { useState } from 'react'
import { ImageGenerator } from '@/components/shared/image-generator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function MemeGenerator() {
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')

  const additionalControls = (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="top-text">Top Text</Label>
        <Input
          id="top-text"
          placeholder="Enter top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bottom-text">Bottom Text</Label>
        <Input
          id="bottom-text"
          placeholder="Enter bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </div>
    </div>
  )

  return (
    <ImageGenerator
      title="Meme Generator"
      description="Create funny and shareable memes with AI"
      transformationType="meme"
      promptPlaceholder="Describe your meme (e.g., 'A confused cat sitting at a dinner table')"
      additionalControls={additionalControls}
      aspectRatio="square"
    />
  )
}
