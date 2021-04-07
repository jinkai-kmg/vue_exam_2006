module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.1.114:8088/medical/',
          // target: 'http://47.102.206.221/garbage/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
  