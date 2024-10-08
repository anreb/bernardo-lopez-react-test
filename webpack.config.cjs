const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.tsx', // Entry point for your application
    output: {
        filename: 'bundle.js', // Name of the output bundle
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the output directory before emit
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to the source HTML file
            filename: 'index.html', // Name of the generated HTML file in dist
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Directory for static content
        },
        historyApiFallback: true, // Support for HTML5 history API
        compress: true,
        port: 3000, // Port to run the server on
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource', // Use asset module for handling images
            },
        ],
    },
    mode: 'development', // Set mode to development
};
