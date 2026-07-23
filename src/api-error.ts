import pluginApiError from './plugins/api-error.js';

import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/api-error',
		plugins: {
			'mahir-api-error': pluginApiError,
		},
		rules: {
			'mahir-api-error/require-api-error': 2,
		},
	},
];

export default config;
