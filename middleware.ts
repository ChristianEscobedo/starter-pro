import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)', // Allow all auth routes
  '/api/webhooks(.*)',
])

// Function to handle Tempo tracking
const handleTempoTracking = (req: NextRequest, res: NextResponse) => {
  // Add Tempo tracking headers if needed
  if (process.env.NEXT_PUBLIC_TEMPO) {
    res.headers.set('x-tempo-route', req.nextUrl.pathname)
  }
  return res
}

// Apply Clerk middleware to handle authentication
export default clerkMiddleware((auth, req) => {
  // Allow all routes for now, authentication will be handled by the components
  const response = NextResponse.next()
  return handleTempoTracking(req, response)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks).*)',
  ],
}
