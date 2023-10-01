const {
  override,
  addLessLoader,
  adjustStyleLoaders,
} = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');


module.exports = override(
  // access webpack configuration
  addLessLoader((loaderOptions) => {
    const lessLoaderOptions = loaderOptions.lessOptions || {};
    return {
      lessOptions: {
        ...lessLoaderOptions,
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#D64550',
          '@link-color': '#D64550',
        },
      },
    };
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
  (config, env) => {
    // ignore minicssextractplugin
    if (env === 'development') {
      config.plugins.forEach(plugin => {
        if (plugin instanceof MiniCssExtractPlugin) {
          plugin.options.ignoreOrder = true;
        }
      });
    }
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    // include polyfill
    config.resolve.fallback = {
      path: require.resolve('path-browserify'),
      querystring: require.resolve('querystring-es3'),
    };
    return config;
  }
);
