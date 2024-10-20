import common from './dist/common.js';
import module from './dist/module.js';
import node from './dist/node.js';
import typescript from './dist/typescript.js';

export default [
	...common,
	...node,
	...module,
	...typescript,
	{
		ignores: ['.yarn/*', 'dist/*'],
	},
];
