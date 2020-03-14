module.exports = {
  devServer:{
    open:true,
    port:8888
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // rem的单位， 因为使用了lib-flexible, lib-flexible会把所有的屏幕分成10份
            // 1rem 就应该配置为 设计图的  1/10   640
            remUnit: 36
          })
        ]
      }
    }
  }
}