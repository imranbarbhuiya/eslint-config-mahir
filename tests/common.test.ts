import eslintConfig from '../common';

describe('ESLint Config', () => {
	test('should export rules', () => {
		expect(eslintConfig).toMatchSnapshot();
	});
});
