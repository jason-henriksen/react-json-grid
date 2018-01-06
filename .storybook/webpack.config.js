const path = require('path');

module.exports = {
  module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!(stardust))/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					plugins: [
						'transform-runtime',
						'add-module-exports',
						'transform-decorators-legacy',
					],
					presets: ['es2015', 'react', 'stage-1'],
				},
			}
		],		
	  rules: [
	    {
	      test: /\.js$/,
	      include: path.resolve(__dirname, 'src'),
      	exclude: /(node_modules|build)/,
	      use: {
	      	loader: 'babel-loader',
          options: { presets: ['env'] }
      	},
	    },
	    {
		    test: /\.css$/,
		    use: ['style-loader', 'css-loader']
		  }
	  ]
  }
}