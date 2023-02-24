module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ['./node_modules', 'src'],
    cacheDirectory: '.jest/cache',
    transformIgnorePatterns: [
      '<rootDir>/node_modules/(?!@react-native|react-native)',
    ],
    moduleNameMapper: {
      '^[./a-zA-Z0-9$_-]+\\.svg$': '<rootDir>/tests/SvgStub.js'
    },
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
    modulePathIgnorePatterns: ['<rootDir>/packages/'],
    watchPathIgnorePatterns: ['<rootDir>/node_modules'],
  }