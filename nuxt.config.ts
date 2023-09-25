// https://nuxt.com/docs/api/configuration/nuxt-config
import {cloneDeep} from 'lodash';
import getSiteMeta from "./utils/getSiteMeta";

const meta = getSiteMeta();

export default defineNuxtConfig({
  ssr: false,
  // vite: false,
  builder: 'webpack',
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        lang: "en-GB",
      },
      title:
        "Family Tree 365 - Start your family tree today - free! Your first tree is 100% free. Sign-up to begin your genealogy journey today!",
      script: [{ src: "https://js.stripe.com/v3" }],
      meta: [
        ...meta,
        { charset: "utf-8" },
        { name: "HandheldFriendly", content: "True" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "Family Tree 365" },
        {
          hid: "description",
          name: "description",
          content:
            "Our user-friendly yet powerful platform lets you create your own family tree the quick and easy way. No technical knowledge is required. Start your family tree today - free!",
        },
        { property: "og:image:width", content: "2500" },
        { property: "og:image:height", content: "780" },
        { name: "twitter:site", content: "@familytree365" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        {
          hid: "canonical",
          rel: "canonical",
          href: process.env.BASE_URL,
        },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    // 'nuxt-bulma-slim'
  ],
  css: [
    "animate.css/animate.compat.css",
    "~/assets/css/base.css",
    "~/assets/css/bulma.css",
    "~/assets/style/enso.scss",
    "~/assets/css/fontawesome.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/css/fan-chart/svg.css",
    "~/assets/css/fan-chart/fan-chart.css",
  ],
  plugins: [
    "~/plugins/pinia.ts",
    // '~/plugins/bootEnums.js',
    // '~/plugins/i18n.js',
    // '~/plugins/pRoute.js',
    // '~/plugins/filters.js',
    // '~/plugins/numberFormat.js',
    // '~/plugins/shortNumber.js',
    // '~/plugins/toastr.js',
    // '~/plugins/fontawesome.js',
    // '~/plugins/themesSettingRegister.js',
    // '~/plugins/bookmarksSettingRegister.js',
    // '~/plugins/tutorialSettingRegister.js',
    // '~/plugins/notificationsRegister.js',
    // '~/plugins/localisationRegister.js',
    // '~/plugins/ioRegister.js',
    // '~/plugins/tasksNavbarRegister.js',
    // '~/plugins/usersRegister.js',
    // '~/plugins/Validator.js',
    // '~/plugins/date-fns/format.js',
    // '~/plugins/date-fns/formatDistance.js',
    // '~/plugins/vue-select.js',
    // '~/plugins/vuelidate.js',
    //'~/plugins/echo.js',
    // "~/plugins/vue-fb-customer-chat.js",
    // {src: '~/plugins/vue-stripe.js', ssr: false},
  ],
  // postcss: {
  //   plugins: [
  //     // List your PostCSS plugins here
  //     require('postcss-discard-comments'),
  //     // Add more plugins as needed
  //   ]
  // },
  // pinia: {
  //   autoImports: [
  //     // automatically imports `defineStore`
  //     'defineStore', // import { defineStore } from 'pinia'
  //     ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
  //   ],
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build

  webpack: {
    filenames: {
      app: ({ isDev }) => (isDev ? "[name].js" : "[chunkhash].js"),
      chunk: ({ isDev }) => (isDev ? "[name].js" : "[chunkhash].js"),
      css: ({ isDev }) => (isDev ? "[name].css" : "[contenthash].css"),
      img: ({ isDev }) => (isDev ? "[path][name].[ext]" : "img/[hash:7].[ext]"),
      font: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "fonts/[hash:7].[ext]",
      video: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "videos/[hash:7].[ext]",
    },
    transpile: [
      // "@enso-ui/strings",
      // "vee-validate/dist/rules",
      "@enso-ui/enums",
      "@sentry/browser",
      "@sentry/integrations",
      "@enso-ui/sentry",
      "@enso-ui/route-mapper",
      // "d3-dag",
    ],
  },
  hooks: {
    'webpack:config' (configs) {
      const isScssRule = (rule) => rule.test.toString() === "/\\.scss$/i";
      configs[0].module.rules.forEach((rule) => {
        if (isScssRule(rule)) {
          const normalRule = rule.oneOf.find(
            ({ resourceQuery, test }) =>
              resourceQuery === undefined && test === undefined
          );

          const lazyRule = cloneDeep(normalRule);

          lazyRule.test = /\.lazy\.scss$/;
          const idx = lazyRule.use.findIndex(({ loader }) =>
            loader.includes("vue-style-loader")
          );
          if (idx > -1) {
            lazyRule.use.splice(idx, 1, {
              loader: "style-loader",
              options: {
                injectType: "lazyStyleTag",
                insert: function insertAtTop(element) {
                  const parent = document.querySelector("head");
                  parent.insertBefore(element, parent.firstChild);
                },
              },
            });
          }

          rule.oneOf.push(lazyRule);
        }
      });
    },
  },
  // 'vite:extendConfig' (clientConfig, { isClient, isServer }) {

  // },
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "@/assets/_colors.scss" as *;'
  //       }
  //     }
  //   }
  // }
});
