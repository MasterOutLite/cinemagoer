/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },

    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "localhost",
                port: "5000",
                pathname: "/**/**",
            },
            {
                protocol: 'https',
                hostname: "localhost",
                port: "5000",
                pathname: "/**",
            },
            {
                protocol: 'https',
                hostname: 'anitube.in.ua',
                port: '',
                pathname: '/uploads/mini/full-news-poster/**/**',
            },
        ],
    },
}

module.exports = nextConfig
