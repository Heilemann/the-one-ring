import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	purge: {
		content: [
			'./src/**/*.{js,jsx,ts,tsx}',
			'./node_modules/nrsystemtools/dist/vite/*.{js,jsx,ts,tsx}',
		],
		safelist: ['dark'],
	},
	darkMode: ['media', '[data-mode="dark"]'],
	theme: {
		extend: {
			colors: {
				gray: colors.zinc,
			},
		},
	},
	plugins: [],
}
