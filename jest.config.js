module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'vue'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>components/**/*.vue',
    '<rootDir>pages/**/*.vue',
    '<rootDir>libs/**/*.ts',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
