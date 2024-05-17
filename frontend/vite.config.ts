import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import {
	fileURLToPath,
	URL
} from 'url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig( {
	plugins: [
		react(),
		TanStackRouterVite()
	],
	resolve: {
		alias: [
			{
				find: '@features',
				replacement: fileURLToPath( new URL( '../features', import.meta.url ) )
			}
		]
	}
} )

