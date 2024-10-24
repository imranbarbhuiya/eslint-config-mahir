import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {};

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/biome',
		rules,
	},
];

export default config;
