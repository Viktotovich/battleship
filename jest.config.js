/* eslint-disable*/
/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,

  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "bower_components", "shared"],

  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};

module.exports = config;
