# Mahir ESLint Config

The ultimate ESLint shareable config. This config includes all of the ESLint rules that I use in my projects.

> [!Important]
> This is a highly opinionated config. It's based on my personal preferences and the way I write code.
> I don't recommend using this config as is as I'll update it based on my preferences without any notice.

<div align="center">
 <br />
 <p>
  <a href="https://www.npmjs.com/package/eslint-config-mahir"><img src="https://img.shields.io/npm/v/eslint-config-mahir.svg?maxAge=3600" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/eslint-config-mahir"><img src="https://img.shields.io/npm/dw/eslint-config-mahir.svg?maxAge=3600" alt="npm downloads" /></a>
 </p>
</div>

## Installation

```bash
npm install --save-dev eslint eslint-config-mahir
```

## Quick Setup (CLI)

The easiest way to set up ESLint with this config is using the CLI:

```bash
npx eslint-config-mahir
```

This will interactively guide you through selecting a preset and options. You can also use flags:

```bash
npx eslint-config-mahir --preset nextjs --tailwind
npx eslint-config-mahir -p react -y
```

Available options:

- `-p, --preset <name>` - Preset to use (nextjs, react, node, native, library)
- `-t, --tailwind` - Include Tailwind CSS support
- `--no-tailwind` - Exclude Tailwind CSS support
- `--i18n` / `--no-i18n` - Include/exclude next-intl i18n rules (Next.js)
- `--native-tailwind` / `--no-native-tailwind` - Include/exclude React Native Tailwind className rules
- `--central-icons` / `--no-central-icons` - Include/exclude central-icons barrel-import rules
- `--api-error` / `--no-api-error` - Include/exclude ApiError rules for queryFn/mutationFn
- `--query` / `--no-query` - Include/exclude TanStack Query ESLint rules (`@tanstack/eslint-plugin-query`)
- `-y, --yes` - Skip prompts and use defaults
- `--cwd <path>` - Working directory
- `-h, --help` - Show help

The CLI offers the `i18n`, `native-tailwind`, `central-icons`, `query`, and `api-error` options only when they are relevant to your project (for example, `i18n` for Next.js, and `query` when `@tanstack/react-query` is detected).

## Manual Usage

Add in your eslint.config.js (for esm projects) or eslint.config.mjs

```js
import common from 'eslint-config-mahir/common';
import node from 'eslint-config-mahir/node';
import module from 'eslint-config-mahir/module';
import typescript from 'eslint-config-mahir/typescript';
import jsx from 'eslint-config-mahir/jsx';
import react from 'eslint-config-mahir/react';
import next from 'eslint-config-mahir/next';
import mdx from 'eslint-config-mahir/mdx';
import edge from 'eslint-config-mahir/edge';
import jsdoc from 'eslint-config-mahir/jsdoc';
import tsdoc from 'eslint-config-mahir/tsdoc';
import native from 'eslint-config-mahir/native';
import tailwind from 'eslint-config-mahir/tailwind';
import i18n from 'eslint-config-mahir/i18n';
import nativeTailwind from 'eslint-config-mahir/native-tailwind';
import centralIcons from 'eslint-config-mahir/central-icons';
import apiError from 'eslint-config-mahir/api-error';

export default [
	...common,
	...node,
	...module,
	...typescript,
	...jsx,
	...react, // when using react, you can omit jsx as it's already included with react
	...next,
	...mdx,
	...edge,
	...jsdoc,
	...tsdoc, // when using tsdoc, you can omit jsdoc as it's already included with tsdoc
	...native, // when using native, you can omit react as it's already included with native
	...tailwind, // for projects using Tailwind CSS (requires eslint-plugin-better-tailwindcss)
	...i18n, // for Next.js projects using next-intl
	...nativeTailwind, // for React Native projects using Tailwind (use with native + tailwind)
	...centralIcons, // for React/React Native projects using @central-icons-react* packages
	...apiError, // for projects using TanStack Query — require ApiError in queryFn/mutationFn
];
```

You can remove any of the configs you don't need.

> **Note**:

For typescript users, typed linting is done via `projectService`. You can learn more about it from https://typescript-eslint.io/getting-started/typed-linting/#faqs and customize it as per your need.

```js
/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
export default [
	...
	{
	languageOptions: {
		parserOptions: {
			projectService: {
				allowDefaultProject: [
					'files-outside-tsconfig.json',
				],
				defaultProject: 'tsconfig.json',
			},
			tsconfigRootDir: process.cwd(),
		},
	},
]
```

> **Warning**:
> If you are using both `mdx` and `typescript` config, make sure add files to avoid conflicts

```js
/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
export default [
	// ... other configs
	...mdx.map((config) => ({
		files: ['**/*.mdx'],
		...config,
	})),
	...typescript.map((config) => ({
		files: ['**/*.tsx', '**/*.ts', '**/*.cjs', '**/*.jsx', '**/*.js'],
		...config,
	})),
	// ... other configs
];
```

## Configs

This package contains eslint config for

- `common` rules common for all configs
- `node` rules for nodejs projects
- `module` rules for esm projects
- `typescript` rules for typescript projects
- `jsx` rules for jsx/tsx projects
- `react` rules for react projects (this config contains all the `jsx` rules too)
- `native` rules for react native projects (this config contains all the `react` rules too)
- `next` rules for nextjs projects
- `mdx` rules for mdx projects
- `edge` rules for projects running in edge
- `jsdoc` jsdoc related config
- `tsdoc` tsdoc related config (this config contains all the `jsdoc` rules too)
- `tailwind` rules for Tailwind CSS projects (requires `eslint-plugin-better-tailwindcss`)

The following configs are opt-in and are offered by the CLI only when relevant to your project. They are intentionally not bundled into `next` or `native`:

- `i18n` rules for Next.js projects using [`next-intl`](https://next-intl.dev) (enforces static `t()` keys and disallows passing `t` around). Use alongside `next`.
- `native-tailwind` rules for React Native projects using Tailwind (forbids `flex`/`flex-col`, `font-[Inter]`, and maps `font-*` weights to `inter-*`). Use alongside `native` and `tailwind`.
- `central-icons` rules for React or React Native projects using `@central-icons-react*` packages (forbids barrel imports and autofixes to direct subpath imports). Use alongside `react`, `native`, or `next`.
- `api-error` rules for TanStack Query projects (requires `ApiError` instead of `Error` inside `queryFn`/`mutationFn`, including extracted handlers). Use alongside `react`, `native`, or `next`.

## Contributors ✨

Thanks goes to these wonderful people:

<a href="https://github.com/imranbarbhuiya/eslint-config-mahir/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=imranbarbhuiya/eslint-config-mahir" />
</a>
