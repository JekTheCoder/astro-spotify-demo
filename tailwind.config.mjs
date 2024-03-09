/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				glass: {
					DEFAULT: 'hsla(0, 0%, 100%, 0.1)',
					dark: 'hsla(0, 0%, 0%, 0.3)',
				}
			}
		},
	},
	plugins: [],
}
