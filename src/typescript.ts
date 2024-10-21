import { fixupPluginRules } from '@eslint/compat';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
// @ts-expect-error eslint-plugin-typescript-sort-keys is not typed
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import tseslint from 'typescript-eslint';

import type { TSESLint } from '@typescript-eslint/utils';

const rules: TSESLint.FlatConfig.Rules = {
	'@typescript-eslint/adjacent-overload-signatures': 2,
	'@typescript-eslint/array-type': [
		2,
		{
			default: 'array',
		},
	],
	'@typescript-eslint/await-thenable': 2,
	'@typescript-eslint/ban-ts-comment': [
		2,
		{
			'ts-check': true,
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': false,
			'ts-nocheck': false,
		},
	],
	'@typescript-eslint/ban-tslint-comment': 2,
	'@typescript-eslint/class-literal-property-style': [2, 'fields'],
	'@typescript-eslint/consistent-indexed-object-style': 0,
	'@typescript-eslint/consistent-type-assertions': [
		2,
		{
			assertionStyle: 'as',
			objectLiteralTypeAssertions: 'allow',
		},
	],
	'@typescript-eslint/consistent-type-definitions': 2,
	'@typescript-eslint/consistent-type-exports': [
		2,
		{
			fixMixedExportsWithInlineTypeSpecifier: true,
		},
	],
	'@typescript-eslint/consistent-type-imports': [
		2,
		{
			prefer: 'type-imports',
			fixStyle: 'inline-type-imports',
		},
	],
	'@typescript-eslint/default-param-last': 2,
	'@typescript-eslint/dot-notation': [
		2,
		{
			allowKeywords: true,
			allowPattern: '(^[A-Z])|(^[a-z]+(_[a-z]+)+$)',
			allowPrivateClassPropertyAccess: true,
		},
	],
	'@typescript-eslint/explicit-function-return-type': 0,
	'@typescript-eslint/explicit-member-accessibility': 0,
	'@typescript-eslint/explicit-module-boundary-types': 0,
	'@typescript-eslint/init-declarations': 0,
	'@typescript-eslint/member-ordering': [
		1,
		{
			default: [
				'signature',
				'public-instance-field',
				'protected-instance-field',
				'private-instance-field',
				'instance-field',
				'public-constructor',
				'protected-constructor',
				'private-constructor',
				'constructor',
				'public-instance-method',
				'protected-instance-method',
				'private-instance-method',
				'instance-method',
				'public-static-field',
				'protected-static-field',
				'private-static-field',
				'static-field',
				'public-static-method',
				'protected-static-method',
				'private-static-method',
				'static-method',
			],
		},
	],
	'@typescript-eslint/method-signature-style': [2, 'property'],
	'@typescript-eslint/naming-convention': 0,
	'@typescript-eslint/no-array-constructor': 2,
	'@typescript-eslint/no-base-to-string': [
		1,
		{
			ignoredTypeNames: ['RegExp'],
		},
	],
	'@typescript-eslint/no-confusing-non-null-assertion': 2,
	'@typescript-eslint/no-confusing-void-expression': [
		2,
		{
			ignoreArrowShorthand: true,
			ignoreVoidOperator: false,
		},
	],
	'@typescript-eslint/no-dupe-class-members': 2,
	'@typescript-eslint/no-duplicate-enum-values': 2,
	'@typescript-eslint/no-duplicate-type-constituents': 2,
	'@typescript-eslint/no-dynamic-delete': 1,
	'@typescript-eslint/no-empty-function': 0,
	'@typescript-eslint/no-empty-interface': [
		2,
		{
			allowSingleExtends: true,
		},
	],
	'@typescript-eslint/no-explicit-any': 0,
	'@typescript-eslint/no-extra-non-null-assertion': 2,
	'@typescript-eslint/no-extraneous-class': 0,
	'@typescript-eslint/no-floating-promises': [
		2,
		{
			ignoreIIFE: true,
			ignoreVoid: true,
		},
	],
	'@typescript-eslint/no-for-in-array': 2,
	'@typescript-eslint/no-implied-eval': 2,
	'@typescript-eslint/no-inferrable-types': [
		2,
		{
			ignoreParameters: true,
			ignoreProperties: true,
		},
	],
	'@typescript-eslint/no-invalid-this': 2,
	'@typescript-eslint/no-invalid-void-type': [
		2,
		{
			allowAsThisParameter: true,
			allowInGenericTypeArguments: true,
		},
	],
	'@typescript-eslint/no-loop-func': 2,
	'@typescript-eslint/no-magic-numbers': 0,
	'@typescript-eslint/no-meaningless-void-operator': [
		2,
		{
			checkNever: true,
		},
	],
	'@typescript-eslint/no-misused-new': 2,
	'@typescript-eslint/no-misused-promises': [
		2,
		{
			checksConditionals: true,
			checksVoidReturn: false,
		},
	],
	'@typescript-eslint/no-namespace': 0,
	'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
	'@typescript-eslint/no-non-null-asserted-optional-chain': 2,
	'@typescript-eslint/no-non-null-assertion': 0,
	'@typescript-eslint/no-redeclare': [
		2,
		{
			builtinGlobals: true,
		},
	],
	'@typescript-eslint/no-require-imports': 2,
	'@typescript-eslint/no-restricted-imports': 0,
	'@typescript-eslint/no-shadow': 0,
	'@typescript-eslint/no-this-alias': [
		2,
		{
			allowDestructuring: true,
			allowedNames: ['self'],
		},
	],
	'@typescript-eslint/no-type-alias': 0,
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
	'@typescript-eslint/no-unnecessary-condition': 2,
	'@typescript-eslint/no-unnecessary-qualifier': 2,
	'@typescript-eslint/no-unnecessary-type-arguments': 0,
	'@typescript-eslint/no-unnecessary-type-assertion': 2,
	'@typescript-eslint/no-unnecessary-type-constraint': 2,
	'@typescript-eslint/no-unsafe-argument': 0,
	'@typescript-eslint/no-unsafe-assignment': 0,
	'@typescript-eslint/no-unsafe-call': 0,
	'@typescript-eslint/no-unsafe-member-access': 0,
	'@typescript-eslint/no-unsafe-return': 0,
	'@typescript-eslint/no-unused-expressions': 2,
	'@typescript-eslint/no-unused-vars': 0,
	'@typescript-eslint/no-use-before-define': [
		2,
		{
			classes: true,
			functions: false,
			variables: true,
		},
	],
	'@typescript-eslint/no-useless-constructor': 2,
	'@typescript-eslint/non-nullable-type-assertion-style': 0,
	'@typescript-eslint/only-throw-error': 2,
	'@typescript-eslint/prefer-as-const': 2,
	'@typescript-eslint/prefer-enum-initializers': 0,
	'@typescript-eslint/prefer-for-of': 2,
	'@typescript-eslint/prefer-function-type': 2,
	'@typescript-eslint/prefer-includes': 2,
	'@typescript-eslint/prefer-literal-enum-member': 2,
	'@typescript-eslint/prefer-namespace-keyword': 2,
	'@typescript-eslint/prefer-nullish-coalescing': [
		2,
		{
			ignoreMixedLogicalExpressions: true,
		},
	],
	'@typescript-eslint/prefer-optional-chain': 2,
	'@typescript-eslint/prefer-readonly': [
		2,
		{
			onlyInlineLambdas: true,
		},
	],
	'@typescript-eslint/prefer-readonly-parameter-types': 0,
	'@typescript-eslint/prefer-reduce-type-parameter': 2,
	'@typescript-eslint/prefer-regexp-exec': 2,
	'@typescript-eslint/prefer-return-this-type': 2,
	'@typescript-eslint/prefer-string-starts-ends-with': 2,
	'@typescript-eslint/promise-function-async': 0,
	'@typescript-eslint/require-array-sort-compare': [
		2,
		{
			ignoreStringArrays: false,
		},
	],
	'@typescript-eslint/require-await': 0,
	'@typescript-eslint/restrict-plus-operands': 2,
	'@typescript-eslint/restrict-template-expressions': 0,
	'@typescript-eslint/return-await': [2, 'in-try-catch'],
	'@typescript-eslint/sort-type-constituents': 2,
	'@typescript-eslint/strict-boolean-expressions': 0,
	'@typescript-eslint/switch-exhaustiveness-check': 2,
	'@typescript-eslint/triple-slash-reference': [
		2,
		{
			lib: 'never',
			path: 'never',
			types: 'never',
		},
	],
	'@typescript-eslint/typedef': 0,
	'@typescript-eslint/unbound-method': [
		2,
		{
			ignoreStatic: true,
		},
	],
	'@typescript-eslint/unified-signatures': 2,
	'@typescript-eslint/no-empty-object-type': 0,
	'@typescript-eslint/no-unsafe-enum-comparison': 0,
	'consistent-return': 0,
	'default-case': 0,
	'default-case-last': 0,
	'default-param-last': 0,
	'dot-notation': 0,
	'import-x/no-dynamic-require': 0,
	'init-declarations': 0,
	'jsdoc/check-tag-names': 0,
	'jsdoc/require-property-type': 0,
	'n/global-require': 0,
	'no-array-constructor': 0,
	'no-dupe-class-members': 0,
	'no-empty-function': 0,
	'no-implied-eval': 0,
	'no-invalid-this': 0,
	'no-loop-func': 0,
	'no-magic-numbers': 0,
	'no-redeclare': 0,
	'no-restricted-imports': 0,
	'no-return-await': 0,
	'no-shadow': 0,
	'no-throw-literal': 0,
	'no-undef': 0,
	'no-unused-expressions': 0,
	'no-unused-vars': 0,
	'no-use-before-define': 0,
	'no-useless-constructor': 0,
	'require-await': 0,
	'sonarjs/elseif-without-else': 0,
	'sonarjs/max-switch-cases': 0,
	'sonarjs/no-all-duplicated-branches': 2,
	'sonarjs/no-collapsible-if': 2,
	'sonarjs/no-collection-size-mischeck': 2,
	'sonarjs/no-duplicate-string': 0,
	'sonarjs/no-duplicated-branches': 2,
	'sonarjs/no-element-overwrite': 2,
	'sonarjs/no-empty-collection': 2,
	'sonarjs/no-extra-arguments': 2,
	'sonarjs/no-gratuitous-expressions': 2,
	'sonarjs/no-identical-conditions': 2,
	'sonarjs/no-identical-expressions': 2,
	'sonarjs/no-identical-functions': 2,
	'sonarjs/no-ignored-return': 2,
	'sonarjs/no-inverted-boolean-check': 2,
	'sonarjs/no-nested-switch': 2,
	'sonarjs/no-nested-template-literals': 0,
	'sonarjs/no-one-iteration-loop': 2,
	'sonarjs/no-redundant-boolean': 2,
	'sonarjs/no-redundant-jump': 2,
	'sonarjs/no-same-line-conditional': 2,
	'sonarjs/no-small-switch': 0,
	'sonarjs/no-unused-collection': 2,
	'sonarjs/no-use-of-empty-return-value': 2,
	'sonarjs/no-useless-catch': 0,
	'sonarjs/non-existent-operator': 2,
	'sonarjs/prefer-immediate-return': 2,
	'sonarjs/prefer-object-literal': 2,
	'sonarjs/prefer-single-boolean-return': 2,
	'sonarjs/prefer-while': 2,
	'typescript-sort-keys/interface': 2,
	'typescript-sort-keys/string-enum': 2,
};
const settings: TSESLint.FlatConfig.Settings = {
	'import-x/parsers': {
		'@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
	},
	'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
	'import-x/extensions': ['.ts', '.tsx', '.cts', '.mts', '.js', '.jsx'],
	'import-x/resolver': {
		typescript: {
			alwaysTryTypes: true,
			project: ['./tsconfig.json', './tsconfig.eslint.json'],
		},
		node: {
			extensions: ['.ts', '.tsx', '.cts', '.mts', '.js', '.jsx'],
		},
	},
};

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(...tseslint.configs.recommendedTypeChecked, {
	plugins: {
		sonarjs: eslintPluginSonarjs,
		'typescript-sort-keys': fixupPluginRules(eslintPluginTypescriptSortKeys),
	},
	rules,
	settings,
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
});

export default config;
