import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "^@auth0/nextjs-auth0$": "./utils/__mocks__.js",
  },
};
export default createJestConfig(config);
