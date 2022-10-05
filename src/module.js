/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.Config}
 */
module.exports = {
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true,
		},
		sourceType: 'module',
	},
	plugins: ['unicorn'],
	rules: {
		'unicorn/prefer-module': 2,
	},
};
