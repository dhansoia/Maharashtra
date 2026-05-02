import { withPayload } from '@payloadcms/next/withPayload'

/**
 * Optional sub-path mount. Set BASE_PATH=/maharashtra (must start with /) to
 * serve the app at https://example.com/maharashtra. Leave unset for root mount.
 */
const basePath = process.env.BASE_PATH && process.env.BASE_PATH !== '/' ? process.env.BASE_PATH : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
