import pluginCentralIcons from './plugins/central-icons.js';

import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/central-icons',
		plugins: {
			'mahir-central-icons': pluginCentralIcons,
		},
		rules: {
			'mahir-central-icons/no-central-icons-barrel-import': 2,
		},
	},
];

export default config;
