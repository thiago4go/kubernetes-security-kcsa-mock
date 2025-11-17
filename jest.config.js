module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "^@vercel/analytics/react$": "<rootDir>/__mocks__/@vercel/analytics/react.js"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
