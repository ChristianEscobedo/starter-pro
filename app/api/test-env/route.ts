import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    falApiKey: process.env.FAL_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  }

  return NextResponse.json({
    envVars: {
      falApiKeyExists: !!envVars.falApiKey,
      nodeEnv: envVars.nodeEnv,
      vercelEnv: envVars.vercelEnv,
    },
    message: 'If falApiKeyExists is false, you need to set the FAL_API_KEY environment variable.',
  })
}
