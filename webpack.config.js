var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var node_modules = path.resolve(__dirname, "node_modules");
var pathToReact = path.resolve(node_modules, "react/dist/react-with-addons.min.js");

module.exports = {

    entry: path.resolve(__dirname, "src/main.js"),

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js", // bundle-[hash].js
        hash: true
    },

    resolve: {
        alias: {
            "react": pathToReact
        }
    },

    plugins: [new HtmlWebpackPlugin()],

    module: {
        loaders: [
            { test: /\.jsx$/,    loader: "jsx" },
            { test: /\.css$/,    loader: "style!css" },
            { test: /\.png$/,    loader: "url?mimetype=image/png&limit=8192" },
            { test: /\.woff$/,   loader: "url?mimetype=application/font-woff&limit=8192" },
            { test: /\.woff2$/,  loader: "url?mimetype=application/font-woff&limit=8192" },
            { test: /\.ttf$/,    loader: "url?mimetype=application/octet-stream&limit=8192" },
            { test: /\.eot$/,    loader: "file" },
            { test: /\.svg$/,    loader: "url?mimetype=image/svg+xml&limit=8192" },
            
            { test: require.resolve("bootstrap/dist/js/bootstrap"), loader: "imports?jQuery=jquery" }
        ],
        noParse: [pathToReact]
    }

};