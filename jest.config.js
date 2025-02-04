export default {
  transform: {},
  extensionsToTreatAsEsm: [".mjs", ".js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.mjs$": "$1.js", // Allows Jest to recognize .mjs imports
  },
  testEnvironment: "node",
};
