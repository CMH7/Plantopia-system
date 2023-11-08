/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			backgroundImage: {
				leaves: "url('/bg1.png')",
				plants: "url(/plants.jpg)"
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/container-queries'),
		require("daisyui")
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#0CBA86",
					secondary: "#2B9474",
					accent: "#b4e9d6",
					neutral: "#8D8F8F",
					"base-100": "#ffffff",
					info: "#3abff8",
					success: "#36d399",
					warning: "#fbbd23",
					error: "#f87272",
				},
			},
		], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	},
};
