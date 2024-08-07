/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.ConfigType}
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
		'unicorn/prefer-top-level-await': 2,
	},
};
