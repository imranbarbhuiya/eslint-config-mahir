/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.Config}
 */
module.exports = {
	extends: './react.js',
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
	settings: {
		'import/ignore': [
			// react-native's main module is Flow, not JavaScript, and raises parse errors. Additionally,
			// several other react-native-related packages still publish Flow code as their main source.
			'node_modules[\\\\/]+@?react-native',
		],
	},
	overrides: [
		{
			files: ['*.web.*'],
			env: { browser: true },
		},
	],
};
