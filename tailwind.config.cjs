/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px",
				"2xl": "1440px",
				"3xl": "1640px",
				"4xl": "1920px",
			},
			maxWidth: {
				default: "120rem",
				container: "80rem",
			},
		},
	},
	plugins: [],
};
