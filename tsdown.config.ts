import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/*.ts'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	unbundle: true,
	target: 'es2022',
	tsconfig: './tsconfig.json',
	treeshake: true,
	outDir: 'dist',
	format: 'esm',
	dts: true,
});
