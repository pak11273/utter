const fetch = require("node-fetch")

global.fetch = fetch
global.window = global
global.Headers = fetch.Headers
global.Request = fetch.Request
global.Response = fetch.Response
global.location = {hostname: ""}

module.exports = {
  /* testEnvironment: "node", */
  moduleNameMapper: {
    "\\.svg$": require.resolve("./test/svg-mock.js"),
    "\\.jpg$": require.resolve("./test/jpg-mock.js"),
    "\\.png$": require.resolve("./test/png-mock.js"),
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./test/css-mock.js"),
    collectCoverageFrom: ["**/src/**/*.js"],
    coverageThreshhold: {
      global: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0
      }
    }
  }
}
