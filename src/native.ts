import eslintPluginTsdoc from 'eslint-plugin-tsdoc';
import globals from 'globals';

import react from './react.js';

import type { TSESLint } from '@typescript-eslint/utils';

const settings: TSESLint.FlatConfig.Settings = {
	'import-x/ignore': [
		// react-native's main module is Flow, not JavaScript, and raises parse errors. Additionally,
		// several other react-native-related packages still publish Flow code as their main source.
		'node_modules[\\\\/]+@?react-native',
	],
};

const config: TSESLint.FlatConfig.ConfigArray = [
	...react,
	{
		languageOptions: {
			globals: {
				console: false,
				exports: false,
				global: false,
				module: false,
				require: false,
				__DEV__: false,
				Atomics: false,
				ErrorUtils: false,
				FormData: false,
				SharedArrayBuffer: false,
				XMLHttpRequest: false,
				alert: false,
				cancelAnimationFrame: false,
				cancelIdleCallback: false,
				clearImmediate: false,
				clearInterval: false,
				clearTimeout: false,
				fetch: false,
				navigator: false,
				process: false,
				requestAnimationFrame: false,
				requestIdleCallback: false,
				setImmediate: false,
				setInterval: false,
				setTimeout: false,
				window: false,
			},
		},
		plugins: {
			tsdoc: eslintPluginTsdoc,
		},
		settings,
	},
	{
		files: ['*.web.*'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
];

export default config;
