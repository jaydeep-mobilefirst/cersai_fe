module.exports = {
  preset: "ts-jest", // If you're using TypeScript
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js", // Mock file imports
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Add axios here
  ],
};
