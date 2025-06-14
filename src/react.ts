import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import jsx from './jsx.js';

import type { TSESLint } from '@typescript-eslint/utils';
import type eslint from 'eslint';

const rules: TSESLint.FlatConfig.Rules = {
	'react-hooks/exhaustive-deps': 2,
	'react-hooks/rules-of-hooks': 2,
	'react/boolean-prop-naming': 2,
	'react/button-has-type': 2,
	'react/destructuring-assignment': 0,
	'react/display-name': 0,
	'react/forbid-component-props': 0,
	'react/forbid-dom-props': 0,
	'react/forbid-elements': 0,
	'react/function-component-definition': 0,
	'react/hook-use-state': 2,
	'react/iframe-missing-sandbox': 2,
	'react/no-access-state-in-setstate': 2,
	'react/no-adjacent-inline-elements': 0,
	'react/no-array-index-key': 0,
	'react/no-arrow-function-lifecycle': 2,
	'react/no-children-prop': 2,
	'react/no-danger': 2,
	'react/no-danger-with-children': 2,
	'react/no-deprecated': 2,
	'react/no-did-mount-set-state': 2,
	'react/no-did-update-set-state': 2,
	'react/no-direct-mutation-state': 2,
	'react/no-find-dom-node': 2,
	'react/no-invalid-html-attribute': 2,
	'react/no-is-mounted': 2,
	'react/no-multi-comp': 0,
	'react/no-namespace': 2,
	'react/no-redundant-should-component-update': 2,
	'react/no-render-return-value': 2,
	'react/no-set-state': 2,
	'react/no-string-refs': 2,
	'react/no-this-in-sfc': 2,
	'react/no-typos': 2,
	'react/no-unescaped-entities': 0,
	'react/no-unknown-property': 2,
	'react/no-unsafe': 2,
	'react/no-unstable-nested-components': 2,
	'react/no-unused-class-component-methods': 2,
	'react/no-unused-state': 2,
	'react/no-will-update-set-state': 2,
	'react/prefer-es6-class': 2,
	'react/prefer-exact-props': 0,
	'react/prefer-read-only-props': 2,
	'react/prefer-stateless-function': [
		2,
		{
			ignorePureComponents: true,
		},
	],
	'react/react-in-jsx-scope': 0,
	'react/require-default-props': 0,
	'react/require-optimization': 0,
	'react/require-render-return': 2,
	'react/self-closing-comp': 0,
	'react/sort-comp': 2,
	'react/state-in-constructor': [2, 'always'],
	'react/static-property-placement': 2,
	'react/void-dom-elements-no-children': 2,
};

const settings: TSESLint.FlatConfig.Settings = {
	react: {
		version: 'detect',
	},
};

const config: TSESLint.FlatConfig.ConfigArray = [
	...jsx,
	{
		name: 'mahir/react',
		languageOptions: {
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			'react-hooks': eslintPluginReactHooks,
		},
		rules,
		settings,
	},
	eslintPluginReactCompiler.configs.recommended as {
		plugins: {
			'react-compiler': {
				rules: {
					'react-compiler': eslint.Rule.RuleModule;
				};
			};
		};
		rules: {
			'react-compiler/react-compiler': 'error';
		};
	},
];

export default config;
