/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      // Suppress warnings for optional dependencies
      config.ignoreWarnings = [
        { module: /node_modules\/@metamask\/sdk/ },
      ]
      return config
    },
    experimental: {
        webpackBuildWorker: true
    },
    // Suppress hydration warnings caused by browser extensions
    reactStrictMode: true,
  }
  
  module.exports = nextConfig