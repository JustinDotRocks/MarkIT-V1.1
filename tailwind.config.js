/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // Adjust this line according to your project structure
	],
	theme: {
		extend: {
			colors: {
				customOrange: "#ffa726", // Define custom orange color
				customLightPink: "#fff2f3", // Define custom light pink color
				customLightGreen: "#6edbb3",
			},
		},
	},
	plugins: [],
};
