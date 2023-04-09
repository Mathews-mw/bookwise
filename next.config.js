/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
	images: {
		domains: ['localhost', 'avatars.githubusercontent.com', 'images.unsplash.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com/**',
				port: '',
				pathname: '/',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com/**',
				port: '',
				pathname: '/',
			},
		],
	},
	output: 'standalone',
};

module.exports = nextConfig;
