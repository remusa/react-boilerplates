const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|jsx?|ts?|tsx?)$'

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    // '^.+\\.(ts|tsx)?$': 'ts-jest',
    '\\.(ts|tsx)?$': 'ts-jest',
    // ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  // setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testRegex: TEST_REGEX,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/public/',
    '<rootDir>/.github/',
    '<rootDir>/.netlify/',
    '<rootDir>/.next/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'utils', 'src', '__dirname'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/coverage/',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/index.tsx',
    '!<rootDir>/src/serviceWorker.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
