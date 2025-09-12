import eslintPluginImportX from 'eslint-plugin-import-x';
// @ts-expect-error --  eslint-plugin-promise is not typed
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {
	'accessor-pairs': 0,
	camelcase: 0,
	'capitalized-comments': 0,
	'class-methods-use-this': 0,
	complexity: 0,
	'consistent-return': 2,
	'consistent-this': [2, 'self'],
	'constructor-super': 2,
	'dot-notation': 2,
	'func-name-matching': 2,
	'id-match': 0,
	'import-x/dynamic-import-chunkname': 0,
	'import-x/newline-after-import': 2,
	'import-x/no-deprecated': 0,
	'import-x/no-extraneous-dependencies': [
		2,
		{
			devDependencies: true,
			optionalDependencies: true,
			peerDependencies: true,
		},
	],
	'import-x/no-import-module-exports': 0,
	'import-x/no-internal-modules': 0,
	'import-x/no-named-export': 0,
	'import-x/no-nodejs-modules': 0,
	'import-x/no-relative-packages': 0,
	'import-x/no-relative-parent-imports': 0,
	'import-x/no-restricted-paths': 0,
	'import-x/no-unresolved': 0,
	'import-x/no-unused-modules': 0,
	'import-x/no-useless-path-segments': 2,
	'import-x/order': [
		2,
		{
			alphabetize: {
				caseInsensitive: true,
				order: 'asc',
			},
			groups: ['builtin', 'index', 'external', 'internal', 'sibling', 'parent', 'type'],
			'newlines-between': 'always',
		},
	],
	'import-x/prefer-default-export': 0,
	'max-statements': 0,
	'no-dupe-args': 2,
	'no-implicit-coercion': 2,
	'no-implicit-globals': 2,
	'no-implied-eval': 2,
	'no-invalid-this': 0,
	'no-loop-func': 2,
	'no-misleading-character-class': 2,
	'no-octal': 2,
	'no-octal-escape': 2,
	'no-promise-executor-return': 2,
	'no-restricted-exports': 0,
	'no-restricted-properties': 0,
	'no-restricted-syntax': 0,
	'no-sequences': 2,
	'no-shadow': [
		2,
		{
			builtinGlobals: false,
			hoist: 'all',
		},
	],
	'no-undef-init': 2,
	'no-underscore-dangle': 0,
	'no-unmodified-loop-condition': 2,
	'no-unreachable-loop': 2,
	'no-use-before-define': [
		2,
		{
			classes: true,
			functions: false,
			variables: true,
		},
	],
	'no-useless-computed-key': 2,
	'no-useless-return': 2,
	'object-shorthand': [2, 'always'],
	'one-var': [2, 'never'],
	'operator-assignment': [2, 'always'],
	'prefer-arrow-callback': 2,
	'prefer-const': 2,
	'prefer-named-capture-group': 1,
	'prefer-regex-literals': [
		2,
		{
			disallowRedundantWrapping: true,
		},
	],
	'require-atomic-updates': 2,
	'require-unicode-regexp': 0,
	strict: [2, 'never'],
	'unicorn/better-regex': 2,
	'unicorn/consistent-destructuring': 0,
	'unicorn/consistent-function-scoping': 2,
	'unicorn/custom-error-definition': 0,
	'unicorn/empty-brace-spaces': 2,
	'unicorn/error-message': 2,
	'unicorn/escape-case': 2,
	'unicorn/expiring-todo-comments': [
		2,
		{
			allowWarningComments: true,
			ignoreDatesOnPullRequests: true,
			terms: ['TODO', 'todo'],
		},
	],
	'unicorn/import-style': 0,
	'unicorn/no-array-callback-reference': 0,
	'unicorn/no-array-push-push': 0,
	'unicorn/no-for-loop': 2,
	'unicorn/no-keyword-prefix': 0,
	'unicorn/no-unused-properties': 2,
	'unicorn/prefer-at': 0,
	'unicorn/prefer-default-parameters': 2,
	'unicorn/prefer-export-from': 2,
	'unicorn/prefer-json-parse-buffer': 0,
	'unicorn/prefer-switch': 0,
	'unicorn/prefer-ternary': 0,
	'unicorn/prefer-top-level-await': 0,
	'unicorn/prevent-abbreviations': 0,
	'unicorn/relative-url-style': [2, 'never'],
	'unicorn/string-content': 0,
	'unicorn/template-indent': 2,
};

const settings: TSESLint.FlatConfig.Settings = {
	'import-x/extensions': ['.js'],
	'import-x/resolver': {
		node: {
			extensions: ['.js'],
		},
	},
};

const config: TSESLint.FlatConfig.ConfigArray = [
	{
		name: 'mahir/common',
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				requireConfigFile: false,
				ecmaFeatures: {
					globalReturn: false,
					impliedStrict: true,
				},
			},
		},
		plugins: {
			'import-x': eslintPluginImportX,
			unicorn: eslintPluginUnicorn,
			promise: eslintPluginPromise,
		},
		rules,
		settings,
	},
];

export default config;
