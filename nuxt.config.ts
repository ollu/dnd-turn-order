// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: "Turn Order",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=yes" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          type: "image/x-icon",
          href: "icons/icon-80x80.png",
        },
        {
          rel: "apple-touch-icon",
          type: "image/x-icon",
          sizes: "152x152",
          href: "icons/icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          type: "image/x-icon",
          sizes: "167x167",
          href: "icons/icon-167x167.png",
        },
        {
          rel: "apple-touch-icon",
          type: "image/x-icon",
          sizes: "180x180",
          href: "icons/icon-180x180.png",
        },
      ],
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.css"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
  ],

  pwa: {
    manifest: {
      name: "Turn Order",
      short_name: "Turn Order",
      description: "A simple role playing turn order tracker.",
      lang: "en",
      display: "standalone",
      background_color: "#1F2937",
      theme_color: "#1F2937",
      start_url: "/",
      icons: [
        {
          src: "icons/icon-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {},
    devOptions: {
      enabled: true,
    },
  },
});
