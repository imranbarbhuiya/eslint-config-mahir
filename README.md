# Mahir ESLint Config

The ultimate ESLint shareable config. This config includes all of the ESLint rules that I use in my projects.

> [!Important]
> This is a highly opinionated config. It's based on my personal preferences and the way I write code.
> I don't recommend using this config as is as I'll update it based on my preferences without any notice.

<div align="center">
 <br />
 <p>
  <a href="https://www.npmjs.com/package/eslint-config-mahir"><img src="https://img.shields.io/npm/v/eslint-config-mahir.svg?maxAge=3600" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/eslint-config-mahir"><img src="https://img.shields.io/npm/dt/eslint-config-mahir.svg?maxAge=3600" alt="npm downloads" /></a>
 </p>
</div>

## Installation

```bash
npm install --save-dev eslint eslint-config-mahir
```

## Usage

Add in your ESLint config

```json
{
	"extends": [
		"mahir/common",
		"mahir/node",
		"mahir/module",
		"mahir/typescript",
		"mahir/react",
		"mahir/next",
		"mahir/edge"
	]
}
```
<!-- TODO -->
<!-- add mdx -->
<!-- convert to ts -->
<!-- convert to flat config -->

You can remove any of the configs you don't need.

> **Note**:

For typescript users, `mahir/typescript` will try to find a tsconfig with name `tsconfig.eslint.json` in the root of your project. If you want to use a different name, you can change it in your eslint config like this:

```json
{
	"parserOptions": {
		"project": "./tsconfig.json"
	}
}
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
- `edge` rules for projects running in edge
- `jsdoc` jsdoc related config
- `tsdoc` tsdoc related config (this config contains all the `jsdoc` rules too)
- `no-deprecated` rules to warn about using deprecated apis

## Contributors ✨

Thanks goes to these wonderful people:

<a href="https://github.com/imranbarbhuiya/eslint-config-mahir/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=imranbarbhuiya/eslint-config-mahir" />
</a>
