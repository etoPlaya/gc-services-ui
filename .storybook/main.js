const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-webpack5',
  },

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: "sass-loader",
          options: {
            additionalData: `
              @import "@/assets/scss/main.scss";
            `,
            implementation: require('sass'),
          },
        },
      ],
    });

    (() => {
      const ruleSVG = config.module.rules.find(rule => {
        if (rule.test) {
          const test = rule.test.toString();
          const regular = /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
          const regularString = regular.toString();
          
          if (test === regularString) {
            return rule;
          }
        }
      });
  
      ruleSVG.test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
    })();

    config.module.rules.push({
      test: /\.svg$/,
      use: ['svg-inline-loader'],
    });

    config.resolve.alias['@'] = path.resolve('src');

    return config;
  },
}