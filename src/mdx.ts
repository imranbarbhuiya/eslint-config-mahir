import * as mdx from 'eslint-plugin-mdx';

import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		...mdx.flat,
		processor: mdx.createRemarkProcessor({
			lintCodeBlocks: false,
			languageMapper: false,
		}),
	},
	mdx.flatCodeBlocks,
	{
		rules: {
			'react/jsx-sort-props': 'off',
			'@next/next/no-img-element': 'off',
			'react/self-closing-comp': 'off',
			'max-statements-per-line': 'off',
			'react/jsx-indent': 'off',
			'react/jsx-closing-bracket-location': 'off',
		},
	},
];

export default config;
