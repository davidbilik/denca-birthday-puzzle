/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false

let basePath = ''
// if (isGithubActions) {
//   // Trim off `<owner>/` from the repo name
//   const repo = 'denca-birthday-puzzle'
//   basePath = `/${repo}`
// }

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Use the repository name as base path in production
  basePath: basePath,
  assetPrefix: basePath,
  // Ensure static assets are copied correctly
  distDir: 'out',
  // Configure webpack to handle audio files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|m4a)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]',
      },
    });
    return config;
  },
}

module.exports = nextConfig
