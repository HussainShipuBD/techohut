'use strict'

const resolve = require('path').resolve 
// const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
 telemetry: false,
  // buildModules: [
   
  // ],
  
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics'

    // With options

  ],
  googleAnalytics: {
    id: 'UA-191651197-1'
  },

  axios: {
    baseURL: process.env.BASE_URL,
    // baseURL: 'https://dreamsgallerybd.com/'

  },
  //   
// (9cW)4{E414%2(9]

  // password: Tk3?qqvaXU8f6$b+   (9cW)4{E414%2(9]
  // build: {
  //   plugins: [
  //     new webpack.ProvidePlugin({

  //       '_': 'lodash'
  //       // ...etc.
  //     })
  //   ]
  // },
  plugins: [
    '~plugins/vuecommon',
    '~plugins/vue-debounce',
    //{ src: '~plugins/ivuew', ssr: false },
    { src: '~plugins/ivuew' },
    '~plugins/googlechart',
    {src: '~/plugins/vue-gtag', mode: 'client'},
    // {src: '~/plugins/plugins.js', mode: 'client',ssr: false},
    // {src: '~plugins/clickout', ssr: false},
  ],
  head: {
    title: 'Techohut',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Techohut-Description'
      }
    ],
    link: [
      { rel: 'icon', href:"/assets/favIcon.svg", sizes:'32x32'},
      // { rel: 'stylesheet', href:"/assets/css/bootstrap.min.css" },
      { rel: 'stylesheet', href:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' },
      { rel: 'stylesheet', href:"/assets/css/iconfont.min.css" },
      { rel: 'stylesheet', href:"/assets/css/owl.carousel.min.css" },
      // { rel: 'stylesheet', href:"/assets/css/plugins.css" },
      { rel: 'stylesheet', href:"/assets/css/helper.css" },
      { rel: 'stylesheet', href:"/assets/css/style.css" },
      { rel: 'stylesheet', href:"/assets/css/common.css" },
      { rel: 'stylesheet', href:"/assets/css/main.css" },
      { rel: 'stylesheet', href:"/assets/css/new.css" },

    ],
    script: [
      
      // { src: '/assets/js/vendor/modernizr-2.8.3.min.js', body:true  },
      // { src: '/assets/js/jquery-1.12.4.min.js', body:true  },
      // { src: 'https://code.jquery.com/jquery-1.12.4.min.js', body:true  },
      // { src: '/assets/js/popper.min.js',body:true },
      // { src: '/assets/js/bootstrap.min.js',body:true },
      // { src: '/assets/js/plugins.js',body:true },
     // { src: '/assets/js/main.js',body:true },
      // { src: '/assets/js/owl.carousel.min.js',body:true },
      // { src: '/assets/js/script.js',body:true },
    ]

  },
  /*
  ** Global CSS
  */
  css: [

  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'orange' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
