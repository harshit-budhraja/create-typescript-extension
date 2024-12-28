const path = require('path');

module.exports = {
  entry: {
    worker: './src/worker/index.ts',
    content: './src/content/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    // Prevent runtime chunk generation
    runtimeChunk: false,
    // Disable code splitting
    splitChunks: false
  }
};
