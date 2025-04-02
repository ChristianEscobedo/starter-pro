import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { getMockImage } from '@/utils/ai/mock-image-generator'

export const maxDuration = 30 // Allow responses up to 30 seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, negative_prompt, style, brightness, contrast, saturation } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Adjust the prompt based on the selected style
    let stylePrompt = ''
    switch (style) {
      case 'natural':
        stylePrompt = 'natural lighting, realistic, professional photography'
        break
      case 'vibrant':
        stylePrompt = 'vibrant colors, high contrast, eye-catching, professional photography'
        break
      case 'dramatic':
        stylePrompt = 'dramatic lighting, cinematic, moody, professional photography'
        break
      case 'vintage':
        stylePrompt = 'vintage film look, nostalgic, retro, professional photography'
        break
      case 'bw':
        stylePrompt = 'black and white, high contrast, professional photography'
        break
      default:
        stylePrompt = 'professional photography, high quality'
    }

    // Add adjustments based on brightness, contrast, and saturation
    const adjustments = []
    if (brightness && brightness > 50) adjustments.push('brighter than normal')
    if (brightness && brightness < 50) adjustments.push('darker than normal')
    if (contrast && contrast > 50) adjustments.push('high contrast')
    if (contrast && contrast < 50) adjustments.push('low contrast')
    if (saturation && saturation > 50) adjustments.push('highly saturated colors')
    if (saturation && saturation < 50) adjustments.push('desaturated colors')

    const adjustmentsText = adjustments.length > 0 ? `With ${adjustments.join(', ')}.` : ''

    try {
      console.log('Generating professional image with OpenAI')

      // Create a detailed prompt for the professional image generation
      const enhancedPrompt = `Create a professional image based on this description: ${prompt}. 
      Style: ${stylePrompt}. ${adjustmentsText}
      The image should be high resolution, detailed, and of studio quality.
      Make it suitable for professional use in presentations, websites, or marketing materials.`

      // Initialize OpenAI client with API key
      const openaiKey = process.env.OPENAI_API_KEY
      if (!openaiKey) {
        console.warn('OpenAI API key is not configured, using fallback')
        return NextResponse.json({
          image: getMockImage('professional'),
          seed: Math.floor(Math.random() * 1000000),
          style,
          brightness,
          contrast,
          saturation,
          isFallback: true,
        })
      }

      const openai = new OpenAI({ apiKey: openaiKey })

      // Use OpenAI's DALL-E 3 model for image generation
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        style: style === 'natural' ? 'natural' : 'vivid',
      })

      if (!response.data || response.data.length === 0) {
        console.warn('No images in OpenAI response, using fallback')
        return NextResponse.json({
          image: getMockImage('professional'),
          seed: Math.floor(Math.random() * 1000000),
          style,
          brightness,
          contrast,
          saturation,
          isFallback: true,
        })
      }

      return NextResponse.json({
        image: response.data[0].url,
        seed: Math.floor(Math.random() * 1000000),
        style,
        brightness,
        contrast,
        saturation,
      })
    } catch (apiError) {
      console.warn('OpenAI API error:', apiError)
      // Return fallback image
      return NextResponse.json({
        image: getMockImage('professional'),
        seed: Math.floor(Math.random() * 1000000),
        style,
        brightness,
        contrast,
        saturation,
        isFallback: true,
      })
    }
  } catch (error) {
    console.error('Error generating professional image:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate professional image' },
      { status: 500 }
    )
  }
}
