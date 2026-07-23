import pluginI18n from './plugins/i18n.js';

import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/i18n',
		plugins: {
			'mahir-i18n': pluginI18n,
		},
		rules: {
			'mahir-i18n/static-t-arguments': 2,
			'mahir-i18n/no-t-as-parameter': 2,
		},
	},
];

export default config;
