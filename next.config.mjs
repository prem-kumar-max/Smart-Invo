/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  webpack(config, { dev }) {
    if (dev) {
      // Limit simultaneous compilation work on laptops with little free RAM.
      config.parallelism = 2
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
