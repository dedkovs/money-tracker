const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

module.exports = (env = {}) => {
	const { mode = 'development' } = env;

	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const getStyleLoaders = () => {
		return [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader',
		];
	};

	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				title: 'Money Tracker',
				buildTime: new Date().toISOString(),
				template: 'public/index.html',
				favicon: './public/favicon.ico',
			}),
			new CleanWebpackPlugin(),
			// new BundleAnalyzerPlugin(),
		];

		if (isProd) {
			plugins.push(
				new MiniCssExtractPlugin({
					filename: 'main-[hash:8].css',
				})
			);
		}

		return plugins;
	};

	return {
		// context: path.resolve(__dirname, 'src'),
		// entry: './src/index.js',
		mode: isProd ? 'production' : isDev && 'development',

		output: {
			filename: isProd ? 'main-[hash:8].js' : undefined,
			publicPath: isDev ? '/' : undefined,
		},

		module: {
			rules: [
				// Loading JS
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader', 'eslint-loader'],
				},

				// Loading images
				{
					test: /\.(svg|png|jpg|jpeg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'images',
								name: '[name]-[sha1:hash:7].[ext]',
							},
						},
					],
				},

				// Loading fonts
				{
					test: /\.(ttf|otf|eot|woff|woff2)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'fonts',
								name: '[name].[ext]',
							},
						},
					],
				},

				// Loading CSS
				{
					test: /\.(css)$/,
					use: getStyleLoaders(),
				},

				// Loading SASS/SCSS
				{
					test: /\.(s[ca]ss)$/,
					use: [...getStyleLoaders(), 'sass-loader'],
				},
			],
		},

		plugins: getPlugins(),

		devServer: {
			open: true,
			hot: true,
			historyApiFallback: true,
			// inline: true,
			host: '192.168.100.5', //your ip address
			port: 8080,
			contentBase: path.resolve(__dirname, 'public'),

			// disableHostCheck: true,
		},
		devtool: isDev && 'source-map',
	};
};
