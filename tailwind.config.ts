import type { Config } from 'tailwindcss'
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],

	darkMode: 'class',

	theme: {
		extend: {
			keyframes: {
				contact_move: {
					from: {
						transform: 'translateY(-15px)',
					},
					to: {
						transform: 'translateY(0px) scale(1.03)',
					},
				},
				home_move: {
					from: {
						transform: 'translateY(-10px)',
					},
					to: {
						transform: 'translateY(10px)',
					},
				},
			},
			animation: {
				home_move: 'home_move 3s ease',
				contact_move: 'contact_move 3s ease',
			},
		},
	},
	plugins: [],
}
export default config
