/** @type {import('next').NextConfig} */
const nextConfig = {
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
