/**
 * Mock image generator that returns placeholder images when the real API is unavailable
 */
export function getMockImage(type: 'youtube' | 'meme' | 'professional'): string {
  // Return appropriate placeholder images based on the type
  switch (type) {
    case 'youtube':
      return 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1280&h=720&q=80'
    case 'meme':
      return 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=800&q=80'
    case 'professional':
      return 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
    default:
      return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
  }
}
