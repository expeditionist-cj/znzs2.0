const settings = require('./src/config/config')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  // configureWebpack: {
  //   name: settings.name
  // },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = settings.title
        return args
      })
  },
  devServer: {
    port: settings.port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { // 登陆
      '/auth': {
        target: settings.proxyUrl,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: settings.proxyUrl,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      }
    }
  }
}
