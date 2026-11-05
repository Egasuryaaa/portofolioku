/** @type {import('next').NextConfig} */
const nextConfig = {
	compress: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	async headers() {
		return [
			{
				source: '/:all*(svg|jpg|jpeg|png|webp|avif|glb|woff|woff2|ico)',
				locale: false,
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
	webpack(config, { dev }) {
		if (dev) {
			config.cache = false;
		}

		config.module.rules.push({
			test: /\.glb$/,
			type: "asset/resource",
		});
		return config;
	},
};

export default nextConfig;
