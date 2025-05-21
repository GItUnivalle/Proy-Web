/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- Esta línea es necesaria para que funcione "next export"
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Necesario para que funcione con export
  },
}

export default nextConfig