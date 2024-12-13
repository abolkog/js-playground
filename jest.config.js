module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    '!**/node_modules/**',
    'src/**/*.{ts,tsx}',
    '!src/**/**.d.ts',
    '!src/index.tsx',
    '!src/components/App/tabs.ts',
    '!src/helpers/const.ts',
    '!src/helpers/global.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 63,
      branches: 50,
      functions: 63,
      lines: 61,
    },
  },
  coverageReporters: ['lcov', 'text'],
};
