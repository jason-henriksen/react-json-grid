var path = require('path');
module.exports = { 
	context: __dirname,
	entry: {
		app: './src/index.js'
	},
	output: {
    path: __dirname + '/dist',
    filename: 'index.js',
		libraryTarget: 'commonjs2'
  },
	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      include: path.resolve(__dirname, 'src'),
      	exclude: /(node_modules|build)/,
	      use: {
	      	loader: 'babel-loader',
					options: { presets: ['env'] },
      	},
	    },
	    {
		    test: /\.css$/,
		    use: ['style-loader', 'css-loader']
		  }
	  ]
	},
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
	},
	
};
