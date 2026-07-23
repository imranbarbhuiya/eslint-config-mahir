import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

const ALLOWED_ERROR_NAMES = new Set(['ApiError', 'FormValidationError']);

const requireApiError: TSESLint.RuleModule<'useApiError' | 'useApiErrorMember', []> = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Require ApiError instead of Error inside queryFn/mutationFn so status codes propagate to QueryCache error handling',
		},
		schema: [],
		messages: {
			useApiError:
				'Use `new ApiError(message, status)` instead of `new {{thrown}}(...)` inside {{fnType}}. This ensures the HTTP status code is available in QueryCache/retry/error reporting.',
			useApiErrorMember:
				'Throw `new ApiError(message, status)` instead of re-throwing `{{thrown}}` directly inside {{fnType}}. The client error object may lose its HTTP status code in QueryCache/retry/error reporting.',
		},
	},
	defaultOptions: [],
	create(context) {
		const sourceCode = context.sourceCode;
		const fnStack: string[] = [];
		const extractedRefs: { name: string; fnType: string }[] = [];
		const moduleFns = new Map<string, TSESTree.Node>();

		function recordModuleFn(name: string | undefined, body: TSESTree.Node | null | undefined) {
			if (!name || !body) return;
			if (!moduleFns.has(name)) moduleFns.set(name, body);
		}

		function checkThrowNode(node: TSESTree.ThrowStatement, fnType: string) {
			const arg = node.argument;
			if (!arg) return;

			if (arg.type === 'NewExpression' && arg.callee.type === 'Identifier') {
				if (ALLOWED_ERROR_NAMES.has(arg.callee.name)) return;
				context.report({
					node: arg,
					messageId: 'useApiError',
					data: { thrown: arg.callee.name, fnType },
				});
				return;
			}

			if (arg.type === 'MemberExpression') {
				context.report({
					node: arg,
					messageId: 'useApiErrorMember',
					data: { thrown: sourceCode.getText(arg), fnType },
				});
			}
		}

		function walkThrows(node: TSESTree.Node | null | undefined, fnType: string, visited = new Set<TSESTree.Node>()) {
			if (!node || typeof node !== 'object' || visited.has(node)) return;
			visited.add(node);

			if (node.type === 'ThrowStatement') {
				checkThrowNode(node, fnType);
				return;
			}

			if (
				node.type === 'FunctionDeclaration' ||
				node.type === 'FunctionExpression' ||
				node.type === 'ArrowFunctionExpression'
			) {
				walkThrows(node.body, fnType, visited);
				return;
			}

			for (const key of Object.keys(node) as (keyof typeof node)[]) {
				if (key === 'parent' || key === 'loc' || key === 'range') continue;
				const child = node[key];
				if (Array.isArray(child)) for (const c of child) walkThrows(c as TSESTree.Node, fnType, visited);
				else if (child && typeof child === 'object' && 'type' in child && typeof child.type === 'string')
					walkThrows(child as TSESTree.Node, fnType, visited);
			}
		}

		function enterQueryOrMutationFn(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression) {
			const parent = node.parent;
			if (parent.type !== 'Property' || parent.key.type !== 'Identifier') return;
			const name = parent.key.name;
			if (name === 'queryFn' || name === 'mutationFn') fnStack.push(name);
		}

		function exitQueryOrMutationFn(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression) {
			const parent = node.parent;
			if (parent.type !== 'Property' || parent.key.type !== 'Identifier') return;
			const name = parent.key.name;
			if (name === 'queryFn' || name === 'mutationFn') fnStack.pop();
		}

		function checkThrowStatement(node: TSESTree.ThrowStatement) {
			if (fnStack.length === 0) return;
			checkThrowNode(node, fnStack[fnStack.length - 1]!);
		}

		function recordExtractedRef(prop: TSESTree.Property) {
			if (
				prop.key.type !== 'Identifier' ||
				(prop.key.name !== 'queryFn' && prop.key.name !== 'mutationFn') ||
				prop.value.type !== 'Identifier'
			)
				return;
			extractedRefs.push({ name: prop.value.name, fnType: prop.key.name });
		}

		return {
			'Program > FunctionDeclaration'(node: TSESTree.FunctionDeclaration) {
				recordModuleFn(node.id?.name, node.body);
			},
			'Program > VariableDeclaration > VariableDeclarator'(node: TSESTree.VariableDeclarator) {
				if (
					node.id.type === 'Identifier' &&
					(node.init?.type === 'ArrowFunctionExpression' || node.init?.type === 'FunctionExpression')
				)
					recordModuleFn(node.id.name, node.init.body);
			},
			ArrowFunctionExpression: enterQueryOrMutationFn,
			'ArrowFunctionExpression:exit': exitQueryOrMutationFn,
			FunctionExpression: enterQueryOrMutationFn,
			'FunctionExpression:exit': exitQueryOrMutationFn,
			Property: recordExtractedRef,
			ThrowStatement: checkThrowStatement,
			'Program:exit'() {
				for (const { name, fnType } of extractedRefs) {
					const body = moduleFns.get(name);
					if (body) walkThrows(body, fnType);
				}
			},
		};
	},
};

const plugin: TSESLint.FlatConfig.Plugin = {
	meta: {
		name: 'eslint-plugin-mahir-api-error',
		version: '1.0.0',
	},
	rules: {
		'require-api-error': requireApiError,
	},
};

export default plugin;
