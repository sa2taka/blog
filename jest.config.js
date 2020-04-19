module.exports = {
  transform: {
    '^.+\\.js$': 'ts-jest',
    '.*\\.(vue)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>components/**/*.vue',
    '<rootDir>pages/**/*.vue',
    '<rootDir>libs/**/*.ts',
  ],
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime-corejs2)'],
};
