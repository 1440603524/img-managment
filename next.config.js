const env = require('./env')
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ...env[process.env.MODE],
  },
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.alias.assets = path.resolve(__dirname, './assets')
    return config
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'pages'),
    ],
  },
}

module.exports = nextConfig
