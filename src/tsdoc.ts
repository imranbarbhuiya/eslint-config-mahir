import eslintPluginTsdoc from 'eslint-plugin-tsdoc';

import jsdoc from './jsdoc.js';

import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {
	'jsdoc/check-tag-names': 0,
	'jsdoc/require-property-type': 0,
	'jsdoc/no-undefined-types': 0,
	'tsdoc/syntax': 1,
};

const settings: TSESLint.FlatConfig.Settings = {
	jsdoc: {
		mode: 'typescript',
	},
};

const config: TSESLint.FlatConfig.ConfigArray = [
	...jsdoc,
	{
		plugins: {
			tsdoc: eslintPluginTsdoc,
		},
		rules,
		settings,
	},
];

export default config;
