/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				Popins: ['Poppins', 'sans-serif'],
				Vollkorn: ['Vollkorn', 'serif'],
			},
			colors: {
				Primary: '#8fb4ff',
				Secondary: '#d8e4fe',
				Accent: '#f89c6c',
				Bg: '#f2f2f2',
				'Clr-base': '#808080',
			},
		},
	},
	plugins: [],
};
