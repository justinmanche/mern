module.exports = {
	env: {
		es2021: true,
		node: true,
		'jest/globals': true
	},
	plugins: ['jest'],
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'keyword-spacing': ['error', { before: true }]
	}
}
