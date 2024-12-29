/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false

let basePath = ''
if (isGithubActions) {
  // Trim off `<owner>/` from the repo name
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  basePath = `/${repo}`
}

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  basePath,
  // Make sure assets are looked up relative to the base path
  assetPrefix: basePath,
}

module.exports = nextConfig 