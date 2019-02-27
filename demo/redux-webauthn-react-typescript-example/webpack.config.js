const path = require('path');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './static/index.tsx',
  devtool: 'source-map',
  mode: 'development',
  watch: !isProd,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    camelCase: true,
                    localIdentName: '[local]'
                }
            },
            {
                loader: 'typed-css-modules-loader',
                options: {
                    camelCase: true
                }
            }
        ]
    }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
  },
  optimization: {
    namedChunks: true,
    // splitChunks: {
    //   name: true,
    //   cacheGroups: {
    //     // create a "vendor" chunk for third party code
    //     vendor: {
    //         test: /node_modules/,
    //         chunks: "all",
    //         name: "vendor",
    //         priority: 10,
    //         enforce: true
    //     }
    //   }
    // },
  },
};