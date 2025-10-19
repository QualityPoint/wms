import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 8080,
		host: '0.0.0.0',
		proxy: proxyOptions,
		hmr: {
      host: "localhost",     // or your dev hostname/LAN IP
      clientPort: 8080,      // make sure browser can reach this port
      protocol: "ws"         // use "wss" only if you serve via https
    },
		watch: { usePolling: true, interval: 1000 },
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	build: {
		outDir: '../wms/public/wms-admin',
		emptyOutDir: true,
		target: 'es2015',
	},
});
