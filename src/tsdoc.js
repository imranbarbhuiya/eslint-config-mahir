const jsdoc = require('./jsdoc.js');

/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.ConfigType}
 */
module.exports = {
	plugins: ['jsdoc', 'tsdoc'],
	rules: {
		...jsdoc.rules,
		'jsdoc/check-tag-names': 0,
		'jsdoc/require-property-type': 0,
		'tsdoc/syntax': 1,
	},
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
};
