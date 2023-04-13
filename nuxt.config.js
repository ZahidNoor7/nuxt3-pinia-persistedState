// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // ...
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "~/modules/ant-design-vue",
  ],
  buildModules: ["@nuxtjs/composition-api/module"],
  plugins: [{ src: "~/plugins/vuesax.js", mode: "client" }],
  css: ["ant-design-vue/dist/antd.css"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
    plugins: [],
  },
});
