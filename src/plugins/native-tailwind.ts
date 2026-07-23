import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

const classNameRules: TSESLint.RuleModule<'flexOnly' | 'forbidden' | 'inter', []> = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow Tailwind flex-col, standalone flex, font-[Inter] and font-(light|normal|medium|semibold|bold) classes',
		},
		fixable: 'code',
		schema: [],
		messages: {
			forbidden: "Class '{{cls}}' is the default in react-native, so no need to explicitly set it.",
			flexOnly: "Class 'flex' should be removed or changed to 'flex-row' for explicit direction.",
			inter: 'Class font-{{weight}} should be replaced with inter-{{weight}}.',
		},
		hasSuggestions: true,
	},
	defaultOptions: [],
	create(context) {
		const FORBIDDEN = new Set(['flex-col', 'font-[Inter]']);
		const FONT_WEIGHTS = new Set(['font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold']);

		function reportAndFix(node: TSESTree.Node, text: string, raw: string) {
			const classes = text.trim().split(/\s+/);
			const hasFlex = classes.includes('flex');
			const hasFlexCol = classes.includes('flex-col');
			const hasFlexRow = classes.includes('flex-row');
			const offendingForbidden = classes.filter((cl) => FORBIDDEN.has(cl));
			const offendingFontWeights = classes.filter((cl) => FONT_WEIGHTS.has(cl));

			if (!hasFlex && offendingForbidden.length === 0 && offendingFontWeights.length === 0) return;

			if (hasFlex && hasFlexRow) {
				context.report({
					node,
					messageId: 'forbidden',
					data: { cls: 'flex, flex-row' },
					fix(fixer) {
						const kept = classes.filter((cl) => cl !== 'flex' && !FORBIDDEN.has(cl) && !FONT_WEIGHTS.has(cl));
						const replacedFontWeights = classes
							.filter((cl) => FONT_WEIGHTS.has(cl))
							.map((cl) => cl.replace('font-', 'inter-'));
						const finalClasses = [...kept, ...replacedFontWeights].join(' ');
						const quote = raw.startsWith("'") ? "'" : '"';
						return fixer.replaceText(node, `${quote}${finalClasses}${quote}`);
					},
				});
				return;
			}

			if (hasFlex && hasFlexCol) {
				context.report({
					node,
					messageId: 'forbidden',
					data: { cls: 'flex, flex-col' },
					fix(fixer) {
						const kept = classes.filter(
							(cl) => cl !== 'flex' && cl !== 'flex-col' && !FORBIDDEN.has(cl) && !FONT_WEIGHTS.has(cl),
						);
						const replacedFontWeights = classes
							.filter((cl) => FONT_WEIGHTS.has(cl))
							.map((cl) => cl.replace('font-', 'inter-'));
						const finalClasses = [...kept, ...replacedFontWeights].join(' ');
						const quote = raw.startsWith("'") ? "'" : '"';
						return fixer.replaceText(node, `${quote}${finalClasses}${quote}`);
					},
				});
				return;
			}

			if (hasFlexCol && !hasFlex) {
				context.report({
					node,
					messageId: 'forbidden',
					data: { cls: 'flex-col' },
					fix(fixer) {
						const kept = classes.filter((cl) => cl !== 'flex-col' && !FORBIDDEN.has(cl) && !FONT_WEIGHTS.has(cl));
						const replacedFontWeights = classes
							.filter((cl) => FONT_WEIGHTS.has(cl))
							.map((cl) => cl.replace('font-', 'inter-'));
						const finalClasses = [...kept, ...replacedFontWeights].join(' ');
						const quote = raw.startsWith("'") ? "'" : '"';
						return fixer.replaceText(node, `${quote}${finalClasses}${quote}`);
					},
				});
				return;
			}

			if (hasFlex && !hasFlexCol) {
				context.report({
					node,
					messageId: 'flexOnly',
					data: { cls: 'flex' },
					suggest: [
						{
							messageId: 'flexOnly',
							data: { cls: 'flex' },
							fix(fixer) {
								const replacedClasses = classes.map((cl) => (cl === 'flex' ? 'flex-row' : cl));
								const finalClasses = replacedClasses.join(' ');
								const quote = raw.startsWith("'") ? "'" : '"';
								return fixer.replaceText(node, `${quote}${finalClasses}${quote}`);
							},
						},
					],
				});
				return;
			}

			if (offendingForbidden.length > 0) {
				context.report({
					node,
					messageId: 'forbidden',
					data: { cls: offendingForbidden.join(', ') },
					fix(fixer) {
						const kept = classes.filter((cl) => !FORBIDDEN.has(cl) && !FONT_WEIGHTS.has(cl));
						const replacedFontWeights = classes
							.filter((cl) => FONT_WEIGHTS.has(cl))
							.map((cl) => cl.replace('font-', 'inter-'));
						const finalClasses = [...kept, ...replacedFontWeights].join(' ');
						const quote = raw.startsWith("'") ? "'" : '"';
						return fixer.replaceText(node, `${quote}${finalClasses}${quote}`);
					},
				});
			}

			if (offendingFontWeights.length > 0 && offendingForbidden.length === 0) {
				const fontWeights = offendingFontWeights.map((cl) => cl.replace('font-', ''));
				context.report({
					node,
					messageId: 'inter',
					data: { weight: fontWeights.join(', ') },
					fix(fixer) {
						const replacedClasses = classes.map((cl) =>
							FONT_WEIGHTS.has(cl) ? cl.replace('font-', 'inter-') : cl,
						);
						const finalClasses = replacedClasses.join(' ');
						const quote = raw.startsWith("'") ? "'" : '"';
						return fixer.replaceText(node, `${quote}${finalClasses}${quote}`);
					},
				});
			}
		}

		return {
			JSXAttribute(attr) {
				if (attr.name.type !== 'JSXIdentifier' || attr.name.name !== 'className') return;

				if (attr.value?.type === 'Literal' && typeof attr.value.value === 'string') {
					reportAndFix(attr.value, attr.value.value, attr.value.raw);
					return;
				}

				if (
					attr.value?.type === 'JSXExpressionContainer' &&
					attr.value.expression.type === 'Literal' &&
					typeof attr.value.expression.value === 'string'
				)
					reportAndFix(attr.value.expression, attr.value.expression.value, attr.value.expression.raw);
			},
		};
	},
};

const plugin: TSESLint.FlatConfig.Plugin = {
	meta: {
		name: 'eslint-plugin-mahir-native-tailwind',
		version: '1.0.0',
	},
	rules: {
		'class-name-rules': classNameRules,
	},
};

export default plugin;
