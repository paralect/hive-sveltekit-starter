import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			"@/*": "./src/lib/*",
		},
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};

export default config;