module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: 
        '@import "./src/assets/scss/main.scss"',
      },
    },
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeViewBox: false },
          ],
        },
      });
  },
}