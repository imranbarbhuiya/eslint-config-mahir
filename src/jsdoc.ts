import eslintPluginJsdoc from 'eslint-plugin-jsdoc';

import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {
	'jsdoc/check-access': 2,
	'jsdoc/check-alignment': 2,
	'jsdoc/check-examples': 0,
	'jsdoc/check-indentation': 0,
	'jsdoc/check-line-alignment': 0,
	'jsdoc/check-param-names': 2,
	'jsdoc/check-property-names': 2,
	'jsdoc/check-syntax': 2,
	'jsdoc/check-tag-names': 2,
	'jsdoc/check-types': 2,
	'jsdoc/check-values': 2,
	'jsdoc/empty-tags': 2,
	'jsdoc/implements-on-classes': 2,
	'jsdoc/match-description': 0,
	'jsdoc/match-name': 0,
	'jsdoc/multiline-blocks': [
		2,
		{
			noMultilineBlocks: false,
			noSingleLineBlocks: true,
		},
	],
	'jsdoc/no-bad-blocks': 2,
	'jsdoc/no-defaults': 2,
	'jsdoc/no-missing-syntax': 0,
	'jsdoc/no-multi-asterisks': 2,
	'jsdoc/no-restricted-syntax': 0,
	'jsdoc/no-types': 0,
	'jsdoc/no-undefined-types': 2,
	'jsdoc/require-asterisk-prefix': 2,
	'jsdoc/require-description': 0,
	'jsdoc/require-description-complete-sentence': 0,
	'jsdoc/require-example': 0,
	'jsdoc/require-file-overview': 0,
	'jsdoc/require-hyphen-before-param-description': 0,
	'jsdoc/require-jsdoc': 0,
	'jsdoc/require-param': 0,
	'jsdoc/require-param-description': 0,
	'jsdoc/require-param-name': 2,
	'jsdoc/require-param-type': 0,
	'jsdoc/require-property': 2,
	'jsdoc/require-property-description': 2,
	'jsdoc/require-property-name': 2,
	'jsdoc/require-property-type': 2,
	'jsdoc/require-returns': 0,
	'jsdoc/require-returns-check': 0,
	'jsdoc/require-returns-description': 0,
	'jsdoc/require-returns-type': 0,
	'jsdoc/require-throws': 0,
	'jsdoc/require-yields': 0,
	'jsdoc/require-yields-check': 0,
	'jsdoc/tag-lines': [2, 'never', { startLines: 1 }],
	'jsdoc/valid-types': 2,
};

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		plugins: {
			jsdoc: eslintPluginJsdoc,
		},
		rules,
	},
];

export default config;