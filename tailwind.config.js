/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // Adjust this line according to your project structure
	],
	theme: {
		extend: {
			colors: {
				// customOrange: "#ffa726", // Define custom orange color
				customOrange: "#de5e46", // Define custom orange color
				customBlue2: "#628b98",
				customLightPink: "#fff2f3", // Define custom light pink color
				// customLightGreen: "#6edbb3",
				customLightGreen: "#b0dd63",
				customRed: "#cb0a00", // Add your custom red color
				customGreen: "#496f3d",
				customWhite: "#f8f1dd",
				customOrange2: "#e69532",
				customBlue: "#1f5160",
				customBurntOrange: "#be7327",
				customYellow: "#d2a200",
				customLightBlue: "#99bcc7",
			},
		},
	},
	plugins: [],
};
