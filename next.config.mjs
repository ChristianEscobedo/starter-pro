/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_TEMPO: process.env.NEXT_PUBLIC_TEMPO || 'true',
  },
}

export default nextConfig
