import eslintConfig from '../_node';

describe('ESLint Config', () => {
	test('should export rules', () => {
		expect(eslintConfig).toMatchSnapshot();
	});
});
