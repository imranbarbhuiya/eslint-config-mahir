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
const I18N_IMPORT = "import i18n from 'eslint-config-mahir/i18n';";
const NATIVE_TAILWIND_IMPORT = "import nativeTailwind from 'eslint-config-mahir/native-tailwind';";
const CENTRAL_ICONS_IMPORT = "import centralIcons from 'eslint-config-mahir/central-icons';";
const API_ERROR_IMPORT = "import apiError from 'eslint-config-mahir/api-error';";
const QUERY_IMPORT = "import query from '@tanstack/eslint-plugin-query';";

interface ExtraConfigs {
	apiError: boolean;
	centralIcons: boolean;
	i18n: boolean;
	nativeTailwind: boolean;
	query: boolean;
}

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
		i18n: { type: 'boolean', default: false },
		'no-i18n': { type: 'boolean', default: false },
		'native-tailwind': { type: 'boolean', default: false },
		'no-native-tailwind': { type: 'boolean', default: false },
		'central-icons': { type: 'boolean', default: false },
		'no-central-icons': { type: 'boolean', default: false },
		'api-error': { type: 'boolean', default: false },
		'no-api-error': { type: 'boolean', default: false },
		query: { type: 'boolean', default: false },
		'no-query': { type: 'boolean', default: false },
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
  --i18n               Include next-intl i18n rules (Next.js)
  --no-i18n            Exclude next-intl i18n rules
  --native-tailwind    Include React Native Tailwind className rules
  --no-native-tailwind Exclude React Native Tailwind className rules
  --central-icons      Include central-icons barrel-import rules
  --no-central-icons   Exclude central-icons barrel-import rules
  --api-error          Include ApiError rules for queryFn/mutationFn
  --no-api-error       Exclude ApiError rules
  --query              Include TanStack Query ESLint rules
  --no-query           Exclude TanStack Query ESLint rules
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

function generateEslintConfig(preset: string, includeTailwind: boolean, extras: ExtraConfigs): string {
	const presetConfig = PRESETS[preset];
	const imports = [...presetConfig.imports];
	const configs = [...presetConfig.configs];
	const ignores = DEFAULT_IGNORES[preset];

	if (includeTailwind) {
		imports.push(TAILWIND_IMPORT);
		configs.push('tailwind');
	}

	if (extras.query) {
		imports.unshift(QUERY_IMPORT);
		configs.push("query.configs['flat/recommended']");
	}

	if (extras.i18n) {
		imports.push(I18N_IMPORT);
		configs.push('i18n');
	}

	if (extras.nativeTailwind) {
		imports.push(NATIVE_TAILWIND_IMPORT);
		configs.push('nativeTailwind');
	}

	if (extras.centralIcons) {
		imports.push(CENTRAL_ICONS_IMPORT);
		configs.push('centralIcons');
	}

	if (extras.apiError) {
		imports.push(API_ERROR_IMPORT);
		configs.push('apiError');
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

async function getDependencies(cwd: string): Promise<Record<string, string>> {
	const packageJsonPath = path.join(cwd, 'package.json');
	if (!(await fileExists(packageJsonPath))) return {};

	const content = await fs.readFile(packageJsonPath, 'utf8');
	const packageJson = JSON.parse(content) as Record<string, unknown>;

	return {
		...(packageJson.dependencies as Record<string, string> | undefined),
		...(packageJson.devDependencies as Record<string, string> | undefined),
	};
}

function detectPresetFromDependencies(dependencies: Record<string, string>): string | undefined {
	for (const name of DETECTION_PRIORITY) if (dependencies[name]) return PACKAGE_PRESET_MAP[name];

	return undefined;
}

function hasNextIntl(dependencies: Record<string, string>): boolean {
	return Boolean(dependencies['next-intl']);
}

function hasCentralIcons(dependencies: Record<string, string>): boolean {
	return Object.keys(dependencies).some(
		(name) => name.startsWith('@central-icons-react/') || name.startsWith('@central-icons-react-native/'),
	);
}

function hasTanstackQuery(dependencies: Record<string, string>): boolean {
	return Boolean(dependencies['@tanstack/react-query']);
}

function hasTailwind(dependencies: Record<string, string>): boolean {
	return Boolean(dependencies.tailwindcss || dependencies.nativewind);
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

async function installDependencies(
	cwd: string,
	includeTailwind: boolean,
	includePrettier: boolean,
	includeQuery: boolean,
): Promise<string> {
	const pm = await detectPackageManager(cwd);
	const pmName = pm?.name ?? 'npm';

	p.log.info(`Detected package manager: ${pmName}`);

	const deps = ['eslint-config-mahir', 'eslint'];
	if (includeTailwind) deps.push('eslint-plugin-better-tailwindcss');
	if (includeQuery) deps.push('@tanstack/eslint-plugin-query');
	if (includePrettier) deps.push('prettier');

	const spinner = p.spinner();
	spinner.start('Installing dependencies');

	for (const dep of deps) {
		spinner.message(`Installing ${dep}`);
		await addDevDependency(dep, { cwd, silent: true });
	}

	spinner.stop('Dependencies installed');

	return pmName;
}

if (options.help) {
	printHelp();
	process.exit(0);
}

p.intro('eslint-config-mahir setup');

const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();
const skipPrompts = options.yes;

const dependencies = await getDependencies(cwd);

let preset = options.preset;
let includeTailwind = options['no-tailwind'] ? false : options.tailwind ? true : undefined;
let includePrettier = options['no-prettier'] ? false : options.prettier ? true : undefined;
let includeI18n = options['no-i18n'] ? false : options.i18n ? true : undefined;
let includeNativeTailwind = options['no-native-tailwind'] ? false : options['native-tailwind'] ? true : undefined;
let includeCentralIcons = options['no-central-icons'] ? false : options['central-icons'] ? true : undefined;
let includeApiError = options['no-api-error'] ? false : options['api-error'] ? true : undefined;
let includeQuery = options['no-query'] ? false : options.query ? true : undefined;

if (!preset) {
	const detectedPreset = detectPresetFromDependencies(dependencies);
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
	if (preset === 'node' || preset === 'library' || preset === 'nest') includeTailwind = false;
	else if (skipPrompts) includeTailwind = hasTailwind(dependencies);
	else {
		const result = await p.confirm({
			message: 'Include Tailwind CSS support?',
			initialValue: hasTailwind(dependencies),
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeTailwind = result;
	}
}

if (includeI18n === undefined) {
	if (preset !== 'nextjs') includeI18n = false;
	else if (skipPrompts) includeI18n = hasNextIntl(dependencies);
	else {
		const result = await p.confirm({
			message: 'Include next-intl i18n rules?',
			initialValue: hasNextIntl(dependencies),
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeI18n = result;
	}
}

if (includeNativeTailwind === undefined) {
	if (preset !== 'native' || !includeTailwind) includeNativeTailwind = false;
	else if (skipPrompts) includeNativeTailwind = true;
	else {
		const result = await p.confirm({
			message: 'Include React Native Tailwind className rules (flex / Inter fonts)?',
			initialValue: true,
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeNativeTailwind = result;
	}
}

if (includeCentralIcons === undefined) {
	if (preset !== 'native' && preset !== 'react' && preset !== 'nextjs') includeCentralIcons = false;
	else if (skipPrompts) includeCentralIcons = hasCentralIcons(dependencies);
	else {
		const result = await p.confirm({
			message: 'Include central-icons barrel-import rules?',
			initialValue: hasCentralIcons(dependencies),
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeCentralIcons = result;
	}
}

if (includeQuery === undefined) {
	if (preset !== 'native' && preset !== 'react' && preset !== 'nextjs') includeQuery = false;
	else if (skipPrompts) includeQuery = hasTanstackQuery(dependencies);
	else {
		const result = await p.confirm({
			message: 'Include TanStack Query ESLint rules?',
			initialValue: hasTanstackQuery(dependencies),
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeQuery = result;
	}
}

if (includeApiError === undefined) {
	if (preset !== 'native' && preset !== 'react' && preset !== 'nextjs') includeApiError = false;
	else if (skipPrompts) includeApiError = hasTanstackQuery(dependencies);
	else {
		const result = await p.confirm({
			message: 'Include ApiError rules for queryFn/mutationFn?',
			initialValue: hasTanstackQuery(dependencies),
		});

		if (p.isCancel(result)) {
			p.cancel('Operation cancelled.');
			process.exit(0);
		}

		includeApiError = result;
	}
}

if (includePrettier === undefined) {
	if (skipPrompts) includePrettier = true;
	else {
		const result = await p.confirm({
			message: 'Include Prettier with recommended config?',
			initialValue: true,
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
if (includeI18n) p.log.info('Including next-intl i18n rules');
if (includeNativeTailwind) p.log.info('Including React Native Tailwind className rules');
if (includeCentralIcons) p.log.info('Including central-icons barrel-import rules');
if (includeQuery) p.log.info('Including TanStack Query ESLint rules');
if (includeApiError) p.log.info('Including ApiError rules for queryFn/mutationFn');
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

const eslintConfig = generateEslintConfig(preset, includeTailwind, {
	i18n: includeI18n,
	nativeTailwind: includeNativeTailwind,
	centralIcons: includeCentralIcons,
	query: includeQuery,
	apiError: includeApiError,
});
await fs.writeFile(eslintConfigPath, eslintConfig);
p.log.success('Created eslint.config.js');

if (includePrettier) {
	await fs.writeFile(prettierConfigPath, JSON.stringify(PRETTIER_CONFIG, null, '\t') + '\n');
	p.log.success('Created .prettierrc');
}

await addLintScript(packageJsonPath, includePrettier);
p.log.success('Updated package.json with lint script');

const pmName = await installDependencies(cwd, includeTailwind, includePrettier, includeQuery);

const runPrefix = pmName === 'npm' ? `${pmName} run` : pmName;
const commands = [`${runPrefix} lint`];
if (includePrettier) commands.push(`${runPrefix} format`);

p.outro(`Setup complete! Run \`${commands.join(' && ')}\` to lint your code`);

process.exit(0);
