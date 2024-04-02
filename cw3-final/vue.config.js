module.exports = {
    devServer: {
      proxy: {
        '/lesson.json': {
          target: 'http://ng.api4load.com',
          changeOrigin: true,
        },
      },
    },
  };