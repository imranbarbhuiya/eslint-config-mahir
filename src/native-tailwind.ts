import pluginNativeTailwind from './plugins/native-tailwind.js';

import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/native-tailwind',
		plugins: {
			'mahir-native-tailwind': pluginNativeTailwind,
		},
		rules: {
			'mahir-native-tailwind/class-name-rules': 2,
		},
	},
];

export default config;
