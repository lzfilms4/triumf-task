// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "webcomp-boilerplate.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
        new CopyPlugin({
            patterns: [
                { from: "node_modules/tinymce", to: "tinymce" },
                { from: "src/404.html", to: "404.html" },
            ],
        }),
    ],
}
