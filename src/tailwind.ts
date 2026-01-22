import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/tailwind',
		settings: {
			'better-tailwindcss': {
				entryPoint: 'app/globals.css',
			},
		},
		plugins: {
			'better-tailwindcss': eslintPluginBetterTailwindcss,
		},
		rules: {
			'better-tailwindcss/enforce-consistent-class-order': 'warn',
			'better-tailwindcss/no-unnecessary-whitespace': 'warn',
			'better-tailwindcss/enforce-canonical-classes': 'warn',
			'better-tailwindcss/no-unknown-classes': 'error',
		},
	},
];

export default config;
