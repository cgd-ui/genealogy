// https://nuxt.com/docs/api/configuration/nuxt-config

import getSiteMeta from "./utils/getSiteMeta";

const meta = getSiteMeta();

export default defineNuxtConfig({
  ssr: false,
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
  modules: ["@pinia/nuxt"],
  css: [
    "animate.css/animate.compat.css",
    "~/assets/css/base.css",
    "~/assets/style/enso.scss",
    "~/assets/css/fontawesome.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/css/fan-chart/svg.css",
    "~/assets/css/fan-chart/fan-chart.css",
  ],
  plugins: [
    "~/plugins/piana.ts",
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
});
