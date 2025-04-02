import { getMockImage } from './mock-image-generator'

interface OpenAIImageGenerationParams {
  prompt: string
  negative_prompt?: string
  image_size?: string
  num_inference_steps?: number
  guidance_scale?: number
  seed?: number
}

interface OpenAIImageGenerationResponse {
  images: string[]
  seed: number
}

/**
 * Generate an image using OpenAI's DALL-E 3 model
 * @param params - Configuration for the image generation
 * @returns Promise with the generated image data
 */
export async function generateImage(
  params: OpenAIImageGenerationParams
): Promise<OpenAIImageGenerationResponse> {
  const OPENAI_KEY = process.env.OPENAI_API_KEY
  console.log(
    `OPENAI_KEY exists: ${!!OPENAI_KEY}, first chars: ${OPENAI_KEY ? OPENAI_KEY.substring(0, 3) + '...' : 'none'}`
  )

  if (!OPENAI_KEY) {
    throw new Error(
      'OPENAI_API_KEY is not configured. Please set up your OPENAI_API_KEY in the environment variables.'
    )
  }

  // This function is a placeholder as the actual OpenAI calls are now handled in the API routes
  // This maintains compatibility with any code that might be calling the generateImage function
  console.log('OpenAI image generation is now handled directly in the API routes')

  // Return a mock response to maintain compatibility
  return {
    images: [getMockImage('general')],
    seed: params.seed || Math.floor(Math.random() * 1000000),
  }
}
