const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:8081/"
        : "https://prod-test-consumer.vercel.app/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "consumer",
      filename: "remoteEntry.js",
      remotes: {
        header: argv.mode === "development"
          ? "header@http://localhost:8080/remoteEntry.js"
          : "header@https://prod-test-header.vercel.app/remoteEntry.js",
        footer: argv.mode === "development"
          ? "footer@http://localhost:8080/remoteEntry.js"
          : "footer@https://prod-test-header.vercel.app/remoteEntry.js",
        menu: argv.mode === "development"
          ? "menu@http://localhost:8080/remoteEntry.js"
          : "menu@https://prod-test-header.vercel.app/remoteEntry.js",
      },
      exposes: {},
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
