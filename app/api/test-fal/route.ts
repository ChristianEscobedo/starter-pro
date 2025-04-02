import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const falApiKey = process.env.FAL_API_KEY

  // Test the Fal.ai health endpoint
  let healthStatus = null
  let healthError = null

  try {
    console.log('Testing Fal.ai health endpoint from test-fal route')
    const healthResponse = await fetch('https://api.fal.ai/health', {
      method: 'GET',
      headers: falApiKey
        ? {
            Authorization: `Key ${falApiKey}`,
          }
        : {},
      cache: 'no-store',
    })

    healthStatus = healthResponse.status
    if (!healthResponse.ok) {
      healthError = `Health check failed with status ${healthResponse.status}`
    }
  } catch (error) {
    healthError = error instanceof Error ? error.message : String(error)
    console.error('Error testing Fal.ai health endpoint:', healthError)
  }

  // Test a simple API call to verify authentication
  let apiTestResult = null
  let apiTestError = null

  if (falApiKey) {
    try {
      console.log('Testing Fal.ai API authentication')
      // Just a simple request to test authentication
      const testResponse = await fetch('https://api.fal.ai/v1/models', {
        method: 'GET',
        headers: {
          Authorization: `Key ${falApiKey}`,
        },
        cache: 'no-store',
      })

      if (testResponse.ok) {
        apiTestResult = 'Authentication successful'
      } else {
        apiTestError = `API test failed with status ${testResponse.status}`
      }
    } catch (error) {
      apiTestError = error instanceof Error ? error.message : String(error)
      console.error('Error testing Fal.ai API authentication:', apiTestError)
    }
  }

  return NextResponse.json({
    keyExists: !!falApiKey,
    keyFirstChars: falApiKey ? `${falApiKey.substring(0, 3)}...` : null,
    healthCheck: {
      status: healthStatus,
      error: healthError,
    },
    apiTest: {
      result: apiTestResult,
      error: apiTestError,
    },
  })
}
