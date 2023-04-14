const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, "src", "public", "index.html"),
	}),
];

const isDevelopment = process.env.NODE_ENV !== "development";

module.exports = {
	mode: isDevelopment ? "development" : "production",
	plugins,
	devtool: "source-map",
	entry: path.resolve(__dirname, "src", "index.tsx"),
	devServer: {
		hot: true,
		port: 8000,
		open: true,
		historyApiFallback: true,
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
		clean: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".png", ".jpg", ".gif"],
	},
	module: {
		rules: [
			{ test: /\.html$/, use: ["html-loader"] },
			{
				test: /\.[tj]sx?$/,
				loader: "ts-loader",
				options: {
					configFile: path.resolve(__dirname, "tsconfig.json"),
				},
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				type: !isDevelopment ? "asset" : "asset/resource",
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
};
