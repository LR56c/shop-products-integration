const colors = require( 'tailwindcss/colors' )
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{html,tsx}' ],
	theme  : {
		colors: {
			...colors,
			'primary'  : {
				50 : '#dde5c5',
				100: '#c2da9e',
				200: '#7ac55d',
				300: '#34b12f',
				400: '#149d24',
				500: '#0a8920',
				600: '#0f761b',
				700: '#1d631a',
				800: '#325126',
				900: '#383f2e'
			},
			'secondary': {
				50 : '#f6ebe1',
				100: '#fdead3',
				200: '#ffe4ad',
				300: '#ffe48d',
				400: '#ffe777',
				500: '#ffe96f',
				600: '#e5d06b',
				700: '#c1ac6b',
				800: '#948465',
				900: '#625a51'
			},
			'terciary' : {
				50 : '#d2c7ea',
				100: '#a7a1e4',
				200: '#5e86d9',
				300: '#2a93cc',
				400: '#0ba4bd',
				500: '#00a0ab',
				600: '#088296',
				700: '#1a5b7e',
				800: '#2b3e64',
				900: '#353349'
			},
			'error'    : {
				50 : '#eacbcb',
				100: '#e5a8a8',
				200: '#db6b6b',
				300: '#cf3c3c',
				400: '#c11d1d',
				500: '#af1212',
				600: '#9a1818',
				700: '#812525',
				800: '#673232',
				900: '#4a3636'
			}
		},
		extend: {}
	},
	plugins: []
}

