const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Handle CSS imports (e.g., import styles from './styles.module.css')
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    // Handle image imports
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup file for Jest
};

module.exports = createJestConfig(customJestConfig);