// craco.config.js
module.exports = {
    webpack: {
      configure: (config) => {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false, // Disable fs as it's not needed in the browser
          path: require.resolve('path-browserify'),
        };
        return config;
      },
    },
  };
  