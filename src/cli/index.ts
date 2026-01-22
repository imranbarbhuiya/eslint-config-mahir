#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline';
import { parseArgs } from 'node:util';

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
};

const TAILWIND_IMPORT = "import tailwind from 'eslint-config-mahir/tailwind';";

const DEFAULT_IGNORES: Record<string, string[]> = {
	nextjs: ['.github', '.yarn', '.next', 'node_modules', 'next-env.d.ts'],
	react: ['.github', '.yarn', 'node_modules', 'dist', 'build'],
	node: ['.github', '.yarn', 'node_modules', 'dist'],
	native: ['.github', '.yarn', 'node_modules', '.expo', 'android', 'ios'],
	library: ['.github', '.yarn', 'node_modules', 'dist'],
};

const { values: options } = parseArgs({
	options: {
		preset: { type: 'string', short: 'p' },
		tailwind: { type: 'boolean', short: 't', default: false },
		'no-tailwind': { type: 'boolean', default: false },
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
  -p, --preset <name>  Preset to use (nextjs, react, node, native, library)
  -t, --tailwind       Include Tailwind CSS support
  --no-tailwind        Exclude Tailwind CSS support
  -y, --yes            Skip prompts and use defaults
  --cwd <path>         Working directory (defaults to current directory)
  -h, --help           Show this help message

Examples:
  npx eslint-config-mahir
  npx eslint-config-mahir --preset nextjs --tailwind
  npx eslint-config-mahir -p react -y
`);
}

async function prompt(question: string): Promise<string> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

async function selectPreset(): Promise<string> {
	console.log('\nAvailable presets:\n');
	const presetNames = Object.keys(PRESETS);

	for (const [index, name] of presetNames.entries())
		console.log(`  ${index + 1}. ${name} - ${PRESETS[name].description}`);

	const answer = await prompt('\nSelect a preset (1-5): ');
	const index = Number.parseInt(answer, 10) - 1;

	if (index >= 0 && index < presetNames.length) return presetNames[index];

	console.log('Invalid selection, defaulting to "node"');
	return 'node';
}

async function confirmTailwind(preset: string): Promise<boolean> {
	if (preset === 'node' || preset === 'library') return false;

	const answer = await prompt('Include Tailwind CSS support? (y/N): ');
	return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
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

async function readPackageJson(packageJsonPath: string): Promise<Record<string, unknown>> {
	if (await fileExists(packageJsonPath)) {
		const content = await fs.readFile(packageJsonPath, 'utf8');
		return JSON.parse(content) as Record<string, unknown>;
	}

	console.log('No package.json found, creating one...');
	return {
		name: path.basename(path.dirname(packageJsonPath)),
		version: '1.0.0',
		type: 'module',
	};
}

async function updatePackageJson(packageJsonPath: string): Promise<void> {
	const packageJson = await readPackageJson(packageJsonPath);

	const scripts = (packageJson.scripts as Record<string, string> | undefined) ?? {};
	scripts.lint = 'TIMING=1 eslint --cache .';
	scripts.format = 'prettier --write --cache --experimental-cli .';
	packageJson.scripts = scripts;

	const devDeps = (packageJson.devDependencies as Record<string, string> | undefined) ?? {};
	if (!devDeps['eslint-config-mahir']) devDeps['eslint-config-mahir'] = 'latest';

	if (!devDeps.eslint) devDeps.eslint = '^9.0.0';

	if (!devDeps.prettier) devDeps.prettier = '^3.0.0';

	packageJson.devDependencies = devDeps;

	await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, '\t') + '\n');
}

async function addTailwindDependency(packageJsonPath: string): Promise<void> {
	const content = await fs.readFile(packageJsonPath, 'utf8');
	const packageJson = JSON.parse(content) as Record<string, unknown>;

	const devDeps = (packageJson.devDependencies as Record<string, string> | undefined) ?? {};
	devDeps['eslint-plugin-better-tailwindcss'] = 'latest';
	packageJson.devDependencies = devDeps;

	await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, '\t') + '\n');
}

if (options.help) {
	printHelp();
	process.exit(0);
}

console.log('\n🔧 eslint-config-mahir setup\n');

const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();
const skipPrompts = options.yes;

let preset = options.preset;
let includeTailwind = options['no-tailwind'] ? false : options.tailwind ? true : undefined;

if (!preset) {
	if (skipPrompts) preset = 'node';
	else preset = await selectPreset();
}

if (!(preset in PRESETS)) {
	console.error(`Unknown preset: ${preset}`);
	console.log(`Available presets: ${Object.keys(PRESETS).join(', ')}`);
	process.exit(1);
}

if (includeTailwind === undefined) {
	if (skipPrompts) includeTailwind = false;
	else includeTailwind = await confirmTailwind(preset);
}

console.log(`\nSetting up ESLint with preset: ${preset}`);
if (includeTailwind) console.log('Including Tailwind CSS support');

const eslintConfigPath = path.join(cwd, 'eslint.config.js');
const packageJsonPath = path.join(cwd, 'package.json');

if (await fileExists(eslintConfigPath)) {
	const answer = skipPrompts ? 'y' : await prompt('eslint.config.js already exists. Overwrite? (y/N): ');
	if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
		console.log('Aborted.');
		process.exit(0);
	}
}

const eslintConfig = generateEslintConfig(preset, includeTailwind);
await fs.writeFile(eslintConfigPath, eslintConfig);
console.log('✓ Created eslint.config.js');

await updatePackageJson(packageJsonPath);
console.log('✓ Updated package.json with lint and format scripts');

if (includeTailwind) {
	await addTailwindDependency(packageJsonPath);
	console.log('✓ Added eslint-plugin-better-tailwindcss dependency');
}

console.log('\n✅ Setup complete!\n');
console.log('Next steps:');
console.log('  1. Run your package manager to install dependencies');
console.log('  2. Run `npm run lint` to lint your code\n');

process.exit(0);
