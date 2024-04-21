export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '@/(.*)': '<rootDir>/src/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@ui/(.*)': '<rootDir>/src/components/UI/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@icons/(.*)': '<rootDir>/src/components/UI/Icons/$1'
  }
};
