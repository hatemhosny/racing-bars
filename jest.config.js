/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/.jest/setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/src/modules/'],
  moduleNameMapper: {
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
    '^.+\\.css\\?raw': '<rootDir>/.jest/CSSStub.js',
  },
  collectCoverageFrom: ['src/**/*.ts', '!**/build/**', '!**/vendor/**', '!src/modules/**'],
  coverageReporters: ['json', 'html', 'lcov'],
};

export default config;
