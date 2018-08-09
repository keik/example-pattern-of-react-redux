module.exports = {
  devServer: {
    contentBase: ["./dist", "./static"]
  },
  devtool: "inline-source-map",
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }]
  }
};
