/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
	images: {
		domains: ['localhost'],
	},
	output: 'standalone',
};

module.exports = nextConfig;
