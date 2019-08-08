const autoprefixer = require('autoprefixer'); // Parses CSS and adds vendor prefixes to CSS rules
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const visualizer = require('webpack-visualizer-plugin');

function tryResolve_(url, sourceFilename) {
  // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
  // when the importer throws
  try {
    return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
  } catch (e) {
    return '';
  }
}

function tryResolveScss(url, sourceFilename) {
  // Support omission of .scss and leading _
  const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
  return tryResolve_(normalizedUrl, sourceFilename) ||
    tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
      sourceFilename);
}

function materialImporter(url, prev) {
  if (url.startsWith('@material')) {
    const resolved = tryResolveScss(url, prev);
    return {file: resolved || url};
  }
  return {file: url};
}


module.exports = [{
  entry: {
    index: './src/index.js',
    indexStyle: './src/index.scss',
    },
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: '[name].bundle.js', // "[name]" inserts whichever property from 'entry'. (radio.bundle.js, index.bundle.js)
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new visualizer(),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader', // Loader for Webpack used in conjunction with autoprefixer
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          { loader: 'sass-loader',
            options: {
              importer: materialImporter, // Lets sass-loader understand the "@import" in .scss files. Method helps with problems compiling Sass due to nested node_modules directories.
              includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
            }
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  // node: {
  //   fs: 'empty'
  // },

  // externals: [
  //  'child_process',
  // ]
  // devServer: {
  //   host: '10.211.189.15',
  // contentBase: path.join(__dirname, 'dist'),
  // port: '8080',
  // }
}];
