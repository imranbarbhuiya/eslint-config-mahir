# Mahir ESLint Config

The ultimate ESLint shareable config. This config includes all of the ESLint rules that I use in my projects.

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
		"mahir/edge",
		"mahir/prettier"
	]
}
```

You can remove any of the configs you don't need.

**Warning**: Use `mahir/prettier` last, as it disables all rules that might conflict with Prettier.

**Note:** For typescript users, `mahir/typescript` will try to find a tsconfig with name `tsconfig.eslint.json` in the root of your project. If you want to use a different name, you can change it in your eslint config like this:

```json
{
	"parserOptions": {
		"project": "./tsconfig.json"
	}
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/imranbarbhuiya"><img src="https://avatars.githubusercontent.com/u/74945038?v=4?s=100" width="100px;" alt="Parbez"/><br /><sub><b>Parbez</b></sub></a><br /><a href="https://github.com/imranbarbhuiya/eslint-config-mahir/commits?author=imranbarbhuiya" title="Code">💻</a> <a href="#maintenance-imranbarbhuiya" title="Maintenance">🚧</a> <a href="#ideas-imranbarbhuiya" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://renovate.whitesourcesoftware.com"><img src="https://avatars.githubusercontent.com/u/25180681?v=4?s=100" width="100px;" alt="WhiteSource Renovate"/><br /><sub><b>WhiteSource Renovate</b></sub></a><br /><a href="#maintenance-renovate-bot" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
  <tfoot>
    
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
