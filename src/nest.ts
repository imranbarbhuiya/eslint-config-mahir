import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';

import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {
	'@darraghor/nestjs-typed/sort-module-metadata-arrays': 2,
};

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/nest',
		plugins: {
			'@darraghor/nestjs-typed': eslintNestJs.plugin,
		},
		languageOptions: {
			parserOptions: {
				emitDecoratorMetadata: true,
			},
		},
		rules,
	},
];

export default config;
