/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
    env: {
        API_URL: "http://localhost:8000",
        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "smkn4bojonegoro"
    }
};

export default nextConfig;
