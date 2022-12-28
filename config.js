module.exports = {
  config: {
    tailwindjs: './tailwind.config.js',
    port: 9050
  },
  paths: {
    root: './',
    src: {
      base: './src',
      views: './src/html/views',
      css: './src/scss',
      js: './src/js',
      img: './src/assets/img',
      font: './src/assets/fonts'
    },
    dist: './public'
  }
}
