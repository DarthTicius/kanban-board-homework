/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: [
		"./index.html", "./src/**/*.{html,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
		},
		screens: {
			xs: '440px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1280px',
		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
};
