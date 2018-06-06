let path = require('path');
let StyleLintPlugin = require('stylelint-webpack-plugin');
let paths = {
    js: './application/themes/shs/js',
    sass: './application/themes/shs/css/scss',
};

module.exports = {
    devtool: 'source-map',
    entry: `${paths.js}/index.js`,
    output: {
        path: path.resolve(__dirname, paths.js),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'eslint-loader'
            }
        }
        ],
    },
    plugins: [
        new StyleLintPlugin({
            files: paths.scss,
            syntax: 'scss'
        }),
    ]
};
