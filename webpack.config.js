const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


let mode = process.env.NODE_ENV;

let plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './app',
        to: './',
        noErrorOnMissing: true,
        globOptions: {
          ignore: ["**/*.html"],
        },
      },
    ],
  }),      
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './app/index.html'),
    filename: `index.html`,
    minify: true
  })
];

module.exports = {
  entry: {
    index: path.resolve(__dirname, './app/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    watchFiles: ['app/index.html'],
    host: "local-ip",
    port: 1200,
  },
  mode: mode,
  plugins: plugins,
  optimization: {
    minimizer: [
      //Gif
      new ImageMinimizerPlugin({
        test: /\.gif$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['gifsicle', { interlaced: true, optimizationLevel: 3 }]],
          },
        },
      }),
      // Jpeg
      new ImageMinimizerPlugin({
        test: /\.(jpg|jpeg)$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['mozjpeg', { progressive: true, quality: 70 }]],
          },
        },
      }),
      // Png
      new ImageMinimizerPlugin({
        test: /\.png$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['pngquant', { quality: [0.6, 0.8] }]],
          },
        },
      }),
    ],
  },
};
