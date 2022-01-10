module.exports = {
	root: true,
	env: {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		indent: ['error',	'tab'],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'never' ],
		'react/prop-types': 0,
		'no-unused-vars': ['warn'],
		'linebreak-style': ['error', 'unix'],
		'comma-dangle': ['error', 'never'],
		'react/jsx-tag-spacing': ['error'],
		'react/jsx-closing-tag-location': ['error'],
		'react/jsx-closing-bracket-location': ['error', {
			nonEmpty: 'after-props',
			selfClosing: 'after-props'
		}]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
