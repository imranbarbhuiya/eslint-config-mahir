import eslintConfig from '../typescript';

describe('ESLint Config', () => {
	test('should export rules', () => {
		expect(eslintConfig.parser).toBe('@typescript-eslint/parser');
		expect(eslintConfig).toMatchSnapshot();
	});
});
