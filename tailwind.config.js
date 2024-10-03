/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./hooks/**/*.{js,jsx,ts,tsx}",
		"./utils/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				customOrange: "#de5e46",
				customBlue2: "#628b98",
				customLightPink: "#fff2f3",
				customLightGreen: "#b0dd63",
				customRed: "#cb0a00",
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
