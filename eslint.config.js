import common from './dist/common.js';
import node from './dist/node.js';
import typescript from './dist/typescript.js';

export default [
	...common,
	...node,
	...typescript,
	{
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		ignores: ['.yarn/*', 'dist'],
	},
];
