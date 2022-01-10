module.exports = {
	env: {
		es2021: true,
		node: true,
		'jest/globals': true
	},
	plugins: ['jest'],
	ignorePatterns: ['test'],
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab', { offsetTernaryExpressions: false, flatTernaryExpressions: true }],
		'linebreak-style': ['error', 'unix'],
		'no-unused-vars': ['warn'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'keyword-spacing': ['error', { before: true }],
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs']
	}
}
