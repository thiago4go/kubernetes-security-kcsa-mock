module.exports = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    moduleNameMapper: {
      "@vercel/analytics/react": "<rootDir>/__mocks__/@vercel/analytics/react.js"
    },
  };
  