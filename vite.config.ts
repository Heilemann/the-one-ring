import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: 'index.html', // Use index.html as the entry point
		},
	},
})
