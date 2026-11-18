/**
 * Shared Jest config for the packages in packages/*.
 * TypeScript is transpiled with SWC; type checking is done separately by `tsc`.
 * @type {import('jest').Config}
 */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', { jsc: { parser: { syntax: 'typescript' }, target: 'es2022' } }],
  },
};
