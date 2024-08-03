const { writeFileSync } = require('fs');

const obj = require('../../src/common');

obj.rules.sort((a, b) => a.localeCompare(b));

const code = `/**
 * @type {import('@typescript-eslint/utils').TSESLint.Linter.ConfigType}
 */
module.exports = ${JSON.stringify(obj)};
`;
writeFileSync('./src/common.js', code);
