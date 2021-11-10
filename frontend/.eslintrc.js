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
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'never' ],
		'react/prop-types': 0
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
