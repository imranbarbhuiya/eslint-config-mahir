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

## Usage

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
];

```

You can remove any of the configs you don't need.

> **Note**:

For typescript users, typed linting is done via `projectService`. You can learn more about it from https://typescript-eslint.io/getting-started/typed-linting/#faqs and customize it as per your need.

```js
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

## Contributors ✨

Thanks goes to these wonderful people:

<a href="https://github.com/imranbarbhuiya/eslint-config-mahir/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=imranbarbhuiya/eslint-config-mahir" />
</a>
