'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Wand2, Download, Loader2 } from 'lucide-react'
import { ImageUploader } from '@/components/image-uploader'

interface ImageGeneratorProps {
  title: string
  description?: string
  transformationType: 'youtube' | 'meme' | 'professional'
  promptPlaceholder?: string
  additionalControls?: React.ReactNode
  aspectRatio?: 'square' | 'video' | 'custom'
}

export function ImageGenerator({
  title,
  description,
  transformationType,
  promptPlaceholder = 'Describe what you want to generate...',
  additionalControls,
  aspectRatio = 'square',
}: ImageGeneratorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isFallbackUsed, setIsFallbackUsed] = useState(false)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setGeneratedImage(null)
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await fetch(`/api/generate/${transformationType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
          reference_image: uploadedImage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      const data = await response.json()
      console.log('Response from API:', data)
      if (data.error) {
        throw new Error(data.error)
      }
      setGeneratedImage(data.image)
      setIsFallbackUsed(data.isFallback || false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `${transformationType}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video'
      case 'square':
        return 'aspect-square'
      default:
        return 'aspect-square'
    }
  }

  return (
    <div>
      <div className="mb-6 p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 pt-0 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Create Image</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder={promptPlaceholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                <Input
                  id="negative-prompt"
                  placeholder="What to avoid in the generated image"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                />
              </div>

              {additionalControls}

              <div className="space-y-2">
                <Label>Reference Image (Optional)</Label>
                {!uploadedImage ? (
                  <ImageUploader onImageUpload={handleImageUpload} />
                ) : (
                  <div className="space-y-4">
                    <div
                      className={`relative overflow-hidden rounded-md bg-slate-100 ${getAspectRatioClass()}`}
                    >
                      <img
                        src={uploadedImage}
                        alt="Reference image"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setUploadedImage(null)}
                    >
                      Remove Reference
                    </Button>
                  </div>
                )}
              </div>

              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {!error && (
                <div className="rounded-md bg-blue-100 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Note: If the Fal.ai API is unavailable, the app will automatically use placeholder
                  images from Unsplash as a fallback.
                </div>
              )}

              {isFallbackUsed && (
                <div className="mt-2 rounded-md bg-amber-100 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  <strong>Notice:</strong> The Fal.ai API is currently unavailable. A fallback image
                  generator is being used instead.
                </div>
              )}

              <Button
                className="w-full gap-2"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Preview</h2>

            {generatedImage ? (
              <div className="space-y-4">
                <div
                  className={`relative overflow-hidden rounded-md bg-slate-100 ${getAspectRatioClass()}`}
                >
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Button className="w-full gap-2" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-md border-2 border-dashed">
                <p className="mb-2 text-muted-foreground">
                  {isGenerating
                    ? 'Generating your image...'
                    : 'Enter a prompt and click Generate to create an image'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
