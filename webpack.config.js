module.exports = {
  // ...existing code...
  module: {
    rules: [
      // ...existing rules...
      {
        test: /sql-wasm\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          name: 'sql-wasm-[contenthash].wasm'
        }
      }
    ]
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false
    }
  },
  // ...existing code...
};
