const postcssPresetEnv = require('postcss-preset-env')
const postcssEasingGradients = require('postcss-easing-gradients')
const SITE_INFO = require('./content/site/info.json')
const COLOR_MODE_FALLBACK = require('./utils/globals.js')
const { $content } = require('@nuxt/content')

module.exports = {
  target: 'static',
  
  components: true,
  generate: {     
    crawler: false,
    async routes () {
      const { $content } = require('@nuxt/content')
      const locations = await $content('locations').fetch()
      const generatedLocations = locations.map((file) => {
        console.log(file)
        return {
          route: `/locations/${file.slug}`,
          payload: file,
        }
      });

      const pages = await $content('pages').fetch()
      const generatedPages = pages.map((file) => {
        console.log(file.slug)
        return {
          route: `/${file.slug}`,
          payload: file,
        };


      })
      return [...generatedLocations, ...generatedPages]
    }
  },

  // ? The env Property: https://nuxtjs.org/api/configuration-env/
  env: {
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.URL || 'http://createADotEnvFileAndSetURL'
        : 'http://localhost:3000',
    lang: SITE_INFO.sitelang || 'fr_BE'
  },

  router: {
    middleware: 'auth'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: SITE_INFO.sitename || process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: SITE_INFO.sitedescription || process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
        media: 'print',
        onload: `this.media='all'`
      }
    ], // ? Imports the font 'Inter', can be optimized by the netlify plugin 'Subfont' by uncommenting it in `netlify.toml`
    noscript: [
      {
        innerHTML:
          '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">'
      }
    ],
    __dangerouslyDisableSanitizers: ['noscript']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#526488' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/tailwind.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~plugins/filters.js', mode: 'client'},
    {src: '~plugins/v-calendar.js', mode: 'client'},
    {src: '~/plugins/netlify-identity-widget.js', mode: 'client' }
  ],
  
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/color-mode', '@nuxtjs/tailwindcss', '@nuxtjs/svg', '@nuxtjs/pwa', '@braid/vue-formulate/nuxt'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/content', 'nuxt-purgecss', 'nuxt-highcharts'],
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-preset-env': postcssPresetEnv({
          stage: 1,
          features: {
            'nesting-rules': false
          }
        }),
        'postcss-easing-gradients': postcssEasingGradients
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Custom additions configuration
   */
  // ? The content property: https://content.nuxtjs.org/configuration
  content: {
    dir: 'content',
    
  },
  // tailwindcss: {
  //   viewer: false, // disabled because it causes `Error: Cannot find module 'tailwindcss/resolveConfig'`, fixed in https://github.com/nuxt-community/tailwindcss-module/pull/303
  //   cssPath: '~/assets/css/main.pcss',
  //   exposeConfig: true // enables `import { theme } from '~tailwind.config'`
  // },
  purgeCSS: {
    mode: 'postcss',
    // ? Safelisting docs: https://purgecss.com/safelisting.html
    safelist: {
      standard: ['vc-bg-blue-600', 'velo-normalDay', 'velo-today', 'velo-selected','dt__range__beginEnd', 'dt-range__selected', 'vc-text-white', 'datePicked-before', 'datePicked-after', 'datePicked-full', 'datePicked-before-session', 'datePicked-after-session', 'datePicked-full-session', 'vc-day-content::selection', 'velo-selected'],
      deep: [/dark/, /light/, /btn/, /icon/, /main/],
      greedy: [
        /^card/,
        /^nuxt-content/,
        /image$/,
        /title$/,
        /^nuxt-content/,
        /code/,
        /pre/,
        /token/
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system', // default value of $colorMode.preference
    fallback: COLOR_MODE_FALLBACK, // fallback value if not system preference found
    componentName: 'ColorScheme',
    cookie: {
      options: {
        sameSite: 'lax'
      }
    }
  },
  pwa: {
    icon: {
      source: 'static/icon.png',
      filename: 'icon.png'
    },
    manifest: { name: SITE_INFO.sitename || process.env.npm_package_name || '', lang: process.env.lang },
    meta: {
      name: SITE_INFO.sitename || process.env.npm_package_name || '',
      lang: process.env.lang,
      ogHost: process.env.URL,
      ogImage: '/preview.jpg'
    }
  }
}
