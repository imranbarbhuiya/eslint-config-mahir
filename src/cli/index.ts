#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parseArgs } from 'node:util';

import * as p from '@clack/prompts';
import { addDevDependency, detectPackageManager } from 'nypm';

interface PresetConfig {
	imports: string[];
	configs: string[];
	description: string;
}

const PRESETS: Record<string, PresetConfig> = {
	nextjs: {
		imports: [
			"import common from 'eslint-config-mahir/common';",
			"import edge from 'eslint-config-mahir/edge';",
			"import module from 'eslint-config-mahir/module';",
			"import next from 'eslint-config-mahir/next';",
			"import node from 'eslint-config-mahir/node';",
			"import react from 'eslint-config-mahir/react';",
			"import typescript from 'eslint-config-mahir/typescript';",
		],
		configs: ['common', 'node', 'typescript', 'module', 'react', 'next', 'edge'],
		description: 'Next.js application with React, TypeScript, and edge runtime support',
	},
	react: {
		imports: [
			"import common from 'eslint-config-mahir/common';",
			"import module from 'eslint-config-mahir/module';",
			"import node from 'eslint-config-mahir/node';",
			"import react from 'eslint-config-mahir/react';",
			"import typescript from 'eslint-config-mahir/typescript';",
		],
		configs: ['common', 'node', 'typescript', 'module', 'react'],
		description: 'React application with TypeScript',
	},
	node: {
		imports: [
			"import common from 'eslint-config-mahir/common';",
			"import module from 'eslint-config-mahir/module';",
			"import node from 'eslint-config-mahir/node';",
			"import typescript from 'eslint-config-mahir/typescript';",
		],
		configs: ['common', 'node', 'typescript', 'module'],
		description: 'Node.js application with TypeScript',
	},
	native: {
		imports: [
			"import common from 'eslint-config-mahir/common';",
			"import module from 'eslint-config-mahir/module';",
			"import native from 'eslint-config-mahir/native';",
			"import node from 'eslint-config-mahir/node';",
			"import react from 'eslint-config-mahir/react';",
			"import typescript from 'eslint-config-mahir/typescript';",
		],
		configs: ['common', 'node', 'typescript', 'module', 'react', 'native'],
		description: 'React Native application with TypeScript',
	},
	library: {
		imports: [
			"import common from 'eslint-config-mahir/common';",
			"import module from 'eslint-config-mahir/module';",
			"import node from 'eslint-config-mahir/node';",
			"import tsdoc from 'eslint-config-mahir/tsdoc';",
			"import typescript from 'eslint-config-mahir/typescript';",
		],
		configs: ['common', 'node', 'typescript', 'module', 'tsdoc'],
		description: 'TypeScript library with TSDoc support',
	},
	nest: {
		imports: [
			"import common from 'eslint-config-mahir/common';",
			"import module from 'eslint-config-mahir/module';",
			"import nest from 'eslint-config-mahir/nest';",
			"import node from 'eslint-config-mahir/node';",
			"import typescript from 'eslint-config-mahir/typescript';",
		],
		configs: ['common', 'node', 'typescript', 'module', 'nest'],
		description: 'NestJS application with TypeScript',
	},
};

const TAILWIND_IMPORT = "import tailwind from 'eslint-config-mahir/tailwind';";

const PRETTIER_CONFIG = {
	printWidth: 120,
	useTabs: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	endOfLine: 'lf',
};

const DEFAULT_IGNORES: Record<string, string[]> = {
	nextjs: ['.github', '.yarn', '.next', 'node_modules', 'next-env.d.ts'],
	react: ['.github', '.yarn', 'node_modules', 'dist', 'build'],
	node: ['.github', '.yarn', 'node_modules', 'dist'],
	native: ['.github', '.yarn', 'node_modules', '.expo', 'android', 'ios'],
	library: ['.github', '.yarn', 'node_modules', 'dist'],
	nest: ['.github', '.yarn', 'node_modules', 'dist'],
};

const PACKAGE_PRESET_MAP: Record<string, string> = {
	next: 'nextjs',
	'react-native': 'native',
	react: 'react',
	'@nestjs/core': 'nest',
};

const DETECTION_PRIORITY = ['next', 'react-native', 'react', '@nestjs/core'];

const { values: options } = parseArgs({
	options: {
		preset: { type: 'string', short: 'p' },
		tailwind: { type: 'boolean', short: 't', default: false },
		'no-tailwind': { type: 'boolean', default: false },
		prettier: { type: 'boolean', default: false },
		'no-prettier': { type: 'boolean', default: false },
		yes: { type: 'boolean', short: 'y', default: false },
		cwd: { type: 'string' },
		help: { type: 'boolean', short: 'h', default: false },
	},
	strict: true,
	allowPositionals: false,
});

function printHelp(): void {
	console.log(`
eslint-config-mahir - Setup ESLint configuration

Usage:
  npx eslint-config-mahir [options]

Options:
	-p, --preset <name>  Preset to use (nextjs, react, node, native, library, nest)
  -t, --tailwind       Include Tailwind CSS support
  --no-tailwind        Exclude Tailwind CSS support
  --prettier           Include Prettier with recommended config
  --no-prettier        Exclude Prettier
  -y, --yes            Skip prompts and use defaults
  --cwd <path>         Working directory (defaults to current directory)
  -h, --help           Show this help message

Examples:
  npx eslint-config-mahir
  npx eslint-config-mahir --preset nextjs --tailwind --prettier
  npx eslint-config-mahir -p react -y
`);
}

function generateEslintConfig(preset: string, includeTailwind: boolean): string {
	const presetConfig = PRESETS[preset];
	const imports = [...presetConfig.imports];
	const configs = [...presetConfig.configs];
	const ignores = DEFAULT_IGNORES[preset];

	if (includeTailwind) {
		imports.push(TAILWIND_IMPORT);
		configs.push('tailwind');
	}

	let config = imports.join('\n');
	config += '\n\n';
	config += `/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
export default [\n`;

	for (const name of configs) config += `\t...${name},\n`;

	config += `\t{
		ignores: [${ignores.map((i) => `'${i}'`).join(', ')}],
	},
];\n`;

	return config;
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function detectPresetFromPackageJson(cwd: string): Promise<string | undefined> {
	const packageJsonPath = path.join(cwd, 'package.json');
	if (!(await fileExists(packageJsonPath))) return undefined;

	const content = await fs.readFile(packageJsonPath, 'utf8');
	const packageJson = JSON.parse(content) as Record<string, unknown>;

	const dependencies = {
		...(packageJson.dependencies as Record<string, string> | undefined),
		...(packageJson.devDependencies as Record<string, string> | undefined),
	};

	for (const name of DETECTION_PRIORITY) if (dependencies[name]) return PACKAGE_PRESET_MAP[name];

	return undefined;
}

async function addLintScript(packageJsonPath: string, includePrettier: boolean): Promise<void> {
	if (!(await fileExists(packageJsonPath))) {
		p.log.error('No package.json found. Please run this command in a project with package.json.');
		process.exit(1);
	}

	const content = await fs.readFile(packageJsonPath, 'utf8');
	const packageJson = JSON.parse(content) as Record<string, unknown>;

	const scripts = (packageJson.scripts as Record<string, string> | undefined) ?? {};
	scripts.lint = 'TIMING=1 eslint --cache .';
	if (includePrettier) scripts.format = 'prettier --write --cache --experimental-cli .';
	packageJson.scripts = scripts;

	await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, '\t') + '\n');
}

async function installDependencies(cwd: string, includeTailwind: boolean, includePrettier: boolean): Promise<void> {
	const pm = await detectPackageManager(cwd);
	const pmName = pm?.name ?? 'npm';

	p.log.info(`Detected package manager: ${pmName}`);

	const deps = ['eslint-config-mahir', 'eslint'];
	if (includeTailwind) deps.push('eslint-plugin-better-tailwindcss');
	if (includePrettier) deps.push('prettier');

	const spinner = p.spinner();
	spinner.start('Installing dependencies');

	for (const dep of deps) {
		spinner.message(`Installing ${dep}`);
		await addDevDependency(dep, { cwd, silent: true });
	}

	spinner.stop('Dependencies installed');
}

if (options.help) {
	printHelp();
	process.exit(0);
}

p.intro('eslint-config-mahir setup');

const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();
const skipPrompts = options.yes;

let preset = options.preset;
let includeTailwind = options['no-tailwind'] ? false : options.tailwind ? true : undefined;
let includePrettier = options['no-prettier'] ? false : options.prettier ? true : undefined;

if (!preset) {
	const detectedPreset = await detectPresetFromPackageJson(cwd);
	if (skipPrompts) preset = detectedPreset ?? 'node';
	else {
		const presetOptions = Object.entries(PRESETS).map(([value, config]) => ({
			value,
			label: value,
			hint: config.description,
		}));

		if (detectedPreset) {
			const detected = presetOptions.find((option) => option.value === detectedPreset);
			if (detected) {
				detected.hint = `Detected: ${detected.hint}`;
				const remaining = presetOptions.filter((option) => option.value !== detectedPreset);
				presetOptions.splice(0, presetOptions.length, detected, ...remaining);
			}
		}

		const selected = await p.select({
			message: 'Select a preset',
			options: presetOptions,
		});

		if (p.isCancel(selected)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		preset = selected;
	}
}

if (!(preset in PRESETS)) {
	p.log.error(`Unknown preset: ${preset}`);
	p.log.info(`Available presets: ${Object.keys(PRESETS).join(', ')}`);
	process.exit(1);
}

if (includeTailwind === undefined) {
	if (skipPrompts || preset === 'node' || preset === 'library' || preset === 'nest') includeTailwind = false;
	else {
		const result = await p.confirm({
			message: 'Include Tailwind CSS support?',
			initialValue: false,
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeTailwind = result;
	}
}

if (includePrettier === undefined) {
	if (skipPrompts) includePrettier = false;
	else {
		const result = await p.confirm({
			message: 'Include Prettier with recommended config?',
			initialValue: false,
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includePrettier = result;
	}
}

p.log.step(`Setting up ESLint with preset: ${preset}`);
if (includeTailwind) p.log.info('Including Tailwind CSS support');
if (includePrettier) p.log.info('Including Prettier with recommended config');

const eslintConfigPath = path.join(cwd, 'eslint.config.js');
const packageJsonPath = path.join(cwd, 'package.json');
const prettierConfigPath = path.join(cwd, '.prettierrc');

if (await fileExists(eslintConfigPath)) {
	let shouldOverwrite = skipPrompts;

	if (!skipPrompts) {
		const result = await p.confirm({
			message: 'eslint.config.js already exists. Overwrite?',
			initialValue: false,
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		shouldOverwrite = result;
	}

	if (!shouldOverwrite) {
		p.cancel('Aborted.');
		process.exit(0);
	}
}

const eslintConfig = generateEslintConfig(preset, includeTailwind);
await fs.writeFile(eslintConfigPath, eslintConfig);
p.log.success('Created eslint.config.js');

if (includePrettier) {
	await fs.writeFile(prettierConfigPath, JSON.stringify(PRETTIER_CONFIG, null, '\t') + '\n');
	p.log.success('Created .prettierrc');
}

await addLintScript(packageJsonPath, includePrettier);
p.log.success('Updated package.json with lint script');

await installDependencies(cwd, includeTailwind, includePrettier);

p.outro('Setup complete! Run `npm run lint` to lint your code');

process.exit(0);
