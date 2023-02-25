module.exports = {
  roots: ['<rootDir>'],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  preset: "react-native",
  testRegex: '/spec/.*|(\\.|/)(test|spec)\\.[jt]sx',
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx'],
  clearMocks: true
};
 