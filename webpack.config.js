'use strict';
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, 'app/renderer'),
	dist: path.join(__dirname, 'app/renderer-dist'),
};

module.exports = {
	mode: 'development',
	entry: './app/renderer',
	output: {
		path: PATHS.dist,
		filename: 'bundle.js',
	},
	target: 'electron-renderer',
	devServer: {
		historyApiFallback: true,
		overlay: true,
		logLevel: 'warn',
	},
	optimization: {
		minimize: false,
	},
	resolve: {
		// See: https://github.com/webpack/webpack/issues/6811
		mainFields: [
			'browser',
			'module',
			'main',
		],
		alias: {
			components: path.join(PATHS.src, 'components'),
			containers: path.join(PATHS.src, 'containers'),
			views: path.join(PATHS.src, 'views'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'react',
						'stage-3',
					],
					plugins: [
						['transform-class-properties', {spec: true}],
						'react-hot-loader/babel',
					],
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
				exclude: /node_modules/,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin([PATHS.dist]),
		new CopyPlugin([
			{
				context: 'app/renderer',
				from: '**/*',
				ignore: ['*.{js,css,scss}'],
			},
			{
				context: 'node_modules/cryptocurrency-icons/svg/color',
				from: '*.svg',
				to: 'assets/cryptocurrency-icons',
			},
		]),
	],
};
