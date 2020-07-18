const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtPlugin = require("script-ext-html-webpack-plugin");
const {AngularCompilerPlugin} = require("@ngtools/webpack");
const path = require("path")

module.exports = function () {
    return {
        mode: "development",
        entry: "./src/stories/main.ts",
        output: {
            path: __dirname + "/dist",
            filename: "app.js"
        },
        resolve: {extensions: [".ts", ".js"]},
        target: "web",
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [{ loader: 'html-loader' }]
                },
                {
                    test: /\.css$/, // for legacy purposes
                    use: [{ loader: 'raw-loader' }]
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "to-string-loader"
                    }, {
                        loader: "iso-morphic-style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }]
                },
                {
                    test: /\.ts$/, loader: "@ngtools/webpack"
                },
                {
                    // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                    // Removing this will cause deprecation warnings to appear.
                    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                    parser: { system: true },  // enable SystemJS
                }
            ]
        },
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./tools/index.html",
                output: __dirname + "/dist",
                inject: "head"
            }),
            new ScriptExtPlugin({
                defaultAttribute: "defer"
            }),
            new AngularCompilerPlugin({
                tsConfigPath: path.join(__dirname, "./tools/tsconfig.stories.json"),
                mainPath: path.join(__dirname, "./src/stories/main.ts"),
                skipCodeGeneration: true,
                sourceMap: true,
                directTemplateLoading: true,
            })
        ]
    };
};
