import eslintConfig from '../_prettier';

describe('ESLint Config', () => {
	test('should export rules', () => {
		expect(eslintConfig).toMatchSnapshot();
	});
});
