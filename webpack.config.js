const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    console.log("Env", env);
    return {
        plugins: [
          new HtmlWebpackPlugin({ 
            hash: true, 
            template: './src/index.html',
            filename: './index.html',
            favicon: "./src/assets/images/favicon.ico"
          }),
          new HtmlWebpackPlugin({ 
            hash: true, 
            template: './src/200.html',
            filename: './200.html',
            favicon: "./src/assets/images/favicon.ico"
          }),
          new webpack.DefinePlugin({ "process.env.API_URL": JSON.stringify(env.API_URL), "process.env.AWS_URL": JSON.stringify(env.AWS_URL) })
        ],
        entry: ['./src/index.js'],
        output: {
            filename: './js/main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000,
            historyApiFallback: true,
            disableHostCheck: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets:[
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins: [
                                  "@babel/plugin-proposal-nullish-coalescing-operator",
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    loaders: [
                        "style-loader","css-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|ico)$/,
                    use: {
                        loader: "file-loader", 
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./images/"
                        }
                    }
                }
            ]
        }
    }
};