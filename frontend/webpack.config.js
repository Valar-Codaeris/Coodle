const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'output'),
		filename: 'main.js',
	},
	devServer: {
		contentBase: './output',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['@babel/transform-runtime'],
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}
		],
	},
};
