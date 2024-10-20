import mdxParser from 'eslint-mdx';
import mdxPlugin from 'eslint-plugin-mdx';

import type { TSESLint } from '@typescript-eslint/utils';

const plugins: TSESLint.FlatConfig.Plugins = {
	mdx: mdxPlugin,
};

const rules: TSESLint.FlatConfig.Rules = {
	'react/jsx-sort-props': 'off',
	'@next/next/no-img-element': 'off',
	'react/self-closing-comp': 'off',
	'max-statements-per-line': 'off',
	'react/jsx-indent': 'off',
	'react/jsx-closing-bracket-location': 'off',
	'mdx/remark': 2,
};

const settings: TSESLint.FlatConfig.Settings = {
	'mdx/code-blocks': true,
};

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		languageOptions: {
			parser: mdxParser,
			parserOptions: {
				extensions: ['.mdx', '.md'],
			},
		},
		processor: 'mdx/remark',
		plugins,
		rules,
		settings,
	},
	{
		languageOptions: {
			parserOptions: {
				...mdxPlugin.configs['code-blocks'].parserOptions,
			},
		},
		plugins,
		rules: {
			...mdxPlugin.configs['code-blocks'].rules,
		},
	},
];

export default config;
