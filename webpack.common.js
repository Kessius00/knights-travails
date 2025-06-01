// const path = require("path");

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js',
    },
    module: {
        rules: [
            {
                //HTML
                test: /\.html$/i,
                use: ['html-loader'],
            },

            {
                //IMAGES
                test: /\.(png|svg|jpe?g|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'imgs/[name].[hash].[ext]',
                },
            },

            {
                //FONTS
                test: /\.(woff2?|ttf|eot)(\?v=\w+)?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]',
                },
            },
            {
                // BABEL
                // Transpile JavaScript files using Babel
                // This rule applies to all JavaScript files except those in node_modules
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: 'defaults',
                        presets: [['@babel/preset-env']],
                    },
                },
            },
        ],
    },
};
