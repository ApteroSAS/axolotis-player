const path = require('path');
const webpack = require('webpack');
const PrettierPlugin = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');

const {
    version,
    name,
    license,
    repository,
    author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
    mode: "production",
    devtool: 'source-map', //for prod
    //devtool: 'eval-source-map', //for debug
    entry: {
        index: path.join(__dirname, './src/lib/index.ts'),
    },
    output: {
        globalObject: 'this',//https://stackoverflow.com/questions/64639839/typescript-webpack-library-generates-referenceerror-self-is-not-defined
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        library: "axolotis-player",
        asyncChunks: false,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false, terserOptions: {
                    //https://github.com/terser/terser#minify-options
                    keep_classnames: true,
                    keep_fnames:true
                }
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new PrettierPlugin(),
        new webpack.BannerPlugin(banner)
    ],
    resolve: {
        alias: {
            "@root": path.resolve("./src")
        },
        fallback: {
            'fs': false,
            'path': false, // ammo.js seems to also use path
        },
        extensions: ['.ts', '.js', '.json']
    }
};
