import { NextRequest, NextResponse } from 'next/server'
import { generateImage } from '@/utils/ai/fal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, negative_prompt, image_size } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const result = await generateImage({
      prompt,
      negative_prompt,
      image_size: image_size || '1024x1024',
    })

    return NextResponse.json({
      image: result.images[0],
      seed: result.seed,
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    )
  }
}
