import packageJson from "./package.json";

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import { terser } from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import vuePlugin from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss'

import fs from 'fs';
import path from 'path';

const baseFolderPath = './src/components/';

const components = fs
  .readdirSync(baseFolderPath)
  .filter((f) => 
    fs.statSync(path.join(baseFolderPath, f)).isDirectory()
  );

const entries = {
  'index': './src/index.js',
  ...components.reduce((obj, name) => {
    obj[name] = (baseFolderPath + name)
    return obj;
  }, {})
};

const aliasConfig = {
  entries: [
    {
      find: '@',
      replacement: baseFolderPath,
    },
  ],
}

const vuePluginConfig = {
  template: {
    css: false,
    isProduction: true,
    compilerOptions: {
      whitespace: 'condense',
    },
  },
};

const babelOptions = {
  babelHelpers: 'bundled',
};

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const configESMEvery = {
  input: entries,
  external: ['vue'],
  output: [
    {
      format: "esm",
      dir: `dist/esm`,
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.vue'],
    }),
    alias(aliasConfig),
    vuePlugin(vuePluginConfig),
    babel(babelOptions),
    commonjs(),
    scss({
      prefix: `@import './src/assets/scss/main.scss';`,
    }),
  ]
};

const configESMAll = {
  input: 'src/index.js',
  external: ['vue'],
  output: [
    {
      format: "esm",
      file: 'dist/ds-library.mjs',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.vue'],
    }),
    alias(aliasConfig),
    vuePlugin(vuePluginConfig),
    babel(babelOptions),
    commonjs(),
    scss({
      prefix: `@import './src/assets/scss/main.scss';`,
    }),
  ]
};

const configCJSEvery = {
  input: entries,
  external: ['vue'],
  output: [
    {
      format: "cjs",
      dir: `dist/cjs`,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.vue'],
    }),
    alias(aliasConfig),
    vuePlugin(vuePluginConfig),
    babel(babelOptions),
    commonjs(),
    scss({
      prefix: `@import './src/assets/scss/main.scss';`,
    }),
  ]
};

const configCJSAll = {
  input: 'src/index.js',
  external: ['vue'],
  output: [
    {
      format: "umd",
      name: capitalize('ds-library'),
      file: 'dist/ds-library.js',
      exports: 'named',
      sourcemap: true,
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.vue'],
    }),
    alias(aliasConfig),
    vuePlugin(vuePluginConfig),
    babel(babelOptions),
    commonjs(),
    scss({
      prefix: `@import './src/assets/scss/main.scss';`,
    }),
  ]
};

export default () => {
  const config = [
    configESMEvery,
    configESMAll,
    configCJSEvery,
    configCJSAll,
  ];

  if (process.env.MINIFY === 'true') {
    config = config.filter((c) => !!c.output.file)
    config.forEach((c) => {
      c.output.file = c.output.file.replace(/.m?js/g, r => `.min${r}`)
      c.plugins.push(terser({
        output: {
          comments: '/^!/'
        }
      }))
    })
  }

  return config;
}
