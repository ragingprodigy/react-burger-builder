module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: {
    "^@burger/(.*)$": "<rootDir>/src/$1",
  },
};