const fs = require('fs');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV !== 'development';

const setPath = url => path.resolve(__dirname, url);

let url = ''; // 请求接口地址
let buriedPointUrl = ''; // 埋点接口地址

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 删除预加载
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  },
  configureWebpack: {
    entry: {
      app: './src/main.ts'
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
      }),
      (compiler) => {
        compiler.hooks.done.tap('vue-cli-service build', (stats) => {
          // 打包时把配置文件抽成单独的json文件
          const userConfig = require(`./src/config/index.ts`);
          userConfig.url = {
            // 接口请求地址
            http: url,
            // 埋点请求地址
            buriedPoint: buriedPointUrl,
          };
          userConfig.debug = !!process.env.npm_config_debug;
          try {
            fs.accessSync(setPath('dist'), fs.constants.F_OK);
          } catch (e) {
            fs.mkdirSync(setPath('dist'));
          }
          fs.writeFileSync(
            path.join(__dirname, 'dist', 'config.json'),
            JSON.stringify(userConfig, null, '\t'),
            'utf8',
          );
        });
      }
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "src/assets/styles/index.scss";`
      }
    }
  },
  // css: {
  //   extract: isProduction,
  //   sourceMap: false,
  //   requireModuleExtension: false,
  //   // 全局引入mixin.scss
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "src/assets/styles/index.scss";`
  //     }
  //   },
  // },
  parallel: require('os').cpus().length > 1,
  devServer: {
    port: 8008,
    open: false,
    compress: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: 'http://test.happymmall.com',
  },
};