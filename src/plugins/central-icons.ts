import type { TSESLint } from '@typescript-eslint/utils';

const CENTRAL_ICONS_PACKAGE_RE = /^@central-icons-react(?:-native)?\/[^/]+$/;

function centralIconSubpath(iconName: string) {
	if (iconName.endsWith('Default')) return iconName.slice(0, -'Default'.length);
	return iconName;
}

const noCentralIconsBarrelImport: TSESLint.RuleModule<'barrelImport' | 'unsupportedImport', []> = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow barrel imports from @central-icons-react and @central-icons-react-native packages; use direct subpath imports instead',
		},
		fixable: 'code',
		schema: [],
		messages: {
			barrelImport:
				'Avoid barrel imports from `{{source}}`. Import icons directly from `{{source}}/<IconName>` to keep the bundler from opening thousands of icon files.',
			unsupportedImport:
				'Only named icon imports can be autofixed. Use direct subpath default imports from `{{source}}/<IconName>`.',
		},
	},
	defaultOptions: [],
	create(context) {
		return {
			ImportDeclaration(node) {
				const source = node.source.value;
				if (typeof source !== 'string' || !CENTRAL_ICONS_PACKAGE_RE.test(source)) return;

				const namedSpecifiers = node.specifiers.filter((specifier) => specifier.type === 'ImportSpecifier');
				if (namedSpecifiers.length === 0 || namedSpecifiers.length !== node.specifiers.length) {
					context.report({
						node,
						messageId: 'unsupportedImport',
						data: { source },
					});
					return;
				}

				context.report({
					node,
					messageId: 'barrelImport',
					data: { source },
					fix(fixer) {
						const quote = node.source.raw.startsWith("'") ? "'" : '"';
						const fixedImports = namedSpecifiers.map((specifier) => {
							const imported = specifier.imported;
							const importedName = imported.type === 'Identifier' ? imported.name : imported.value;
							const localName = specifier.local.name;
							const typePrefix = node.importKind === 'type' || specifier.importKind === 'type' ? 'type ' : '';
							const subpath = centralIconSubpath(importedName);
							return `import ${typePrefix}${localName} from ${quote}${source}/${subpath}${quote};`;
						});
						return fixer.replaceText(node, fixedImports.join('\n'));
					},
				});
			},
		};
	},
};

const plugin: TSESLint.FlatConfig.Plugin = {
	meta: {
		name: 'eslint-plugin-mahir-central-icons',
		version: '1.0.0',
	},
	rules: {
		'no-central-icons-barrel-import': noCentralIconsBarrelImport,
	},
};

export default plugin;
