import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { getMockImage } from '@/utils/ai/mock-image-generator'

export const maxDuration = 30 // Allow responses up to 30 seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, topText, bottomText } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    try {
      console.log('Generating meme with OpenAI')

      // Initialize OpenAI client
      const openaiKey = process.env.OPENAI_API_KEY
      if (!openaiKey) {
        console.warn('OpenAI API key is not configured, using fallback')
        return NextResponse.json({
          image: getMockImage('meme'),
          seed: Math.floor(Math.random() * 1000000),
          topText,
          bottomText,
          isFallback: true,
        })
      }
      const openai = new OpenAI({ apiKey: openaiKey })

      // Create a detailed prompt for the meme image generation
      const enhancedPrompt = `Create a meme image based on this description: ${prompt}. 
      The image should be humorous and shareable, with clear space at the top and bottom for text overlay. 
      This will be used as a meme with the following text: Top text: "${topText || '[space for top text]'}", 
      Bottom text: "${bottomText || '[space for bottom text]'}". 
      Make it visually clear and optimized for social media sharing.`

      // Use OpenAI's DALL-E 3 model for image generation
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024', // Square format works well for memes
        quality: 'standard',
        style: 'vivid',
      })

      if (!response.data || response.data.length === 0) {
        console.warn('No images in OpenAI response, using fallback')
        return NextResponse.json({
          image: getMockImage('meme'),
          seed: Math.floor(Math.random() * 1000000),
          topText,
          bottomText,
          isFallback: true,
        })
      }

      return NextResponse.json({
        image: response.data[0].url,
        seed: Math.floor(Math.random() * 1000000),
        topText,
        bottomText,
      })
    } catch (apiError) {
      console.warn('OpenAI API error:', apiError)
      // Return fallback image
      return NextResponse.json({
        image: getMockImage('meme'),
        seed: Math.floor(Math.random() * 1000000),
        topText,
        bottomText,
        isFallback: true,
      })
    }
  } catch (error) {
    console.error('Error generating meme:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate meme' },
      { status: 500 }
    )
  }
}
