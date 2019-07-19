const isTest = String(process.env.NODE_ENV) === "test"

module.exports = {
  presets: [
    ["@babel/preset-env", {modules: isTest ? "commonjs" : false}],
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    ["react-hot-loader/babel"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-classes"],
    ["@babel/plugin-transform-arrow-functions"],

  ]
}
