import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { generateText } from 'ai'
import { getMockImage } from '@/utils/ai/mock-image-generator'

export const maxDuration = 30 // Allow responses up to 30 seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, negative_prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    try {
      console.log('Generating YouTube thumbnail with OpenAI')

      // Initialize OpenAI client
      const openaiKey = process.env.OPENAI_API_KEY
      if (!openaiKey) {
        console.warn('OpenAI API key is not configured, using fallback')
        return NextResponse.json({
          image: getMockImage('youtube'),
          seed: Math.floor(Math.random() * 1000000),
          isFallback: true,
        })
      }
      const openai = new OpenAI({ apiKey: openaiKey })

      // Create a detailed prompt for the image generation
      const enhancedPrompt = `Create a YouTube thumbnail based on this description: ${prompt}. 
      The thumbnail should be eye-catching, professional looking, with clear focal points and vibrant colors. 
      It should be designed for a 16:9 aspect ratio and optimized for both mobile and desktop viewing. 
      Make it visually compelling to increase click-through rates.`

      // Use OpenAI's DALL-E 3 model for image generation
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1792x1024', // Close to 16:9 aspect ratio
        quality: 'standard',
        style: 'vivid',
      })

      if (!response.data || response.data.length === 0) {
        console.warn('No images in OpenAI response, using fallback')
        return NextResponse.json({
          image: getMockImage('youtube'),
          seed: Math.floor(Math.random() * 1000000),
          isFallback: true,
        })
      }

      return NextResponse.json({
        image: response.data[0].url,
        seed: Math.floor(Math.random() * 1000000), // Random seed for consistency with previous implementation
      })
    } catch (apiError) {
      console.error('OpenAI API error:', apiError)
      // Return fallback image
      return NextResponse.json({
        image: getMockImage('youtube'),
        seed: Math.floor(Math.random() * 1000000),
        isFallback: true,
      })
    }
  } catch (error) {
    console.error('Error generating YouTube thumbnail:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate YouTube thumbnail' },
      { status: 500 }
    )
  }
}
