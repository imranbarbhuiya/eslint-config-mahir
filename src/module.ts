import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {
	'unicorn/prefer-module': 2,
	'unicorn/prefer-top-level-await': 2,
};

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/module',
		rules,
	},
];

export default config;
