import eslintConfig from '../src/common';

describe('ESLint Config', () => {
	test('should export rules', () => {
		expect(eslintConfig).toMatchSnapshot();
	});
});
