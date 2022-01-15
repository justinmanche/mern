const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = project => {
	const isAdmin = project === 'admin'
	const projectConfig = {
		port: isAdmin ? 8080 : 8081,
		favicon: isAdmin ? 'public/shield.png' : 'public/sword.png'
	}
	const resolve = dir => path.join(__dirname, project, dir)

	const env = process.env.NODE_ENV || 'development'
	const isDev = env === 'development'

	const WebpackDefinePluginConfig = new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(env)
		}
	})

	const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
		template: resolve('public/index.html'),
		filename: 'index.html',
		favicon: resolve(projectConfig.favicon),
		inject: 'body'
	})

	const ESLintPluginConfig = new ESLintPlugin({
		files: 'src',
		fix: true
	})

	return {
		mode: process.env.NODE_ENV || 'development',
		devtool: 'source-map',
		entry: [
			resolve('src/index.js')
		],
		output: {
			filename: isDev ? '[name].js' : '[name].[fullhash].js',
			path: resolve('dist'),
			publicPath: '/',
			clean: true
		},
		devServer: {
			open: true,
			static: {
				directory: path.join(__dirname, project, 'public')
			},
			historyApiFallback: true,
			port: projectConfig.port,
			client: {
				overlay: {
					errors: true,
					warnings: false
				}
			}
		},
		resolve: {
			modules: ['node_modules', resolve('src'), resolve('public')],
			alias: {
				shared: path.join(__dirname, 'shared'),
				config: path.join(__dirname, 'config')
			}
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					include: [path.join(__dirname, 'shared'), resolve('src')]
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader'
						}
					]
				},
				{
					test: /\.(jpe?g|png|gif)$/,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name][ext]'
					}
				},
				{
					test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
					type: 'asset/resource',
					generator: {
						filename: 'icons/[name][ext]'
					}
				},
				{
					test: /\.(woff(2)|ttf|eot|otf)?(\?v=\d+\.\d+\.\d+)?$/,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name][ext]'
					}
				}
			]
		},
		plugins: [
			HtmlWebpackPluginConfig,
			WebpackDefinePluginConfig,
			ESLintPluginConfig
		]
	}
}
