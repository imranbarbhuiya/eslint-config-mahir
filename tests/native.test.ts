import eslintConfig from '../native';

describe('ESLint Config', () => {
	test('should export rules', () => {
		expect(eslintConfig).toMatchSnapshot();
	});
});
