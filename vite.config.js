import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [sveltekit()],
		server: {
			host: true,
			port: process.env.VITE_PORT || 3103,
			hmr: {
				port: 3170
			},
		},

		fs: {
			allow: ['..']
		}
	});

}


