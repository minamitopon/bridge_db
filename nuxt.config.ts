export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(ts|js|vue)$/,
          loader: "vue-tsc",
          exclude: /(node_modules)/,
        });
      }
    },
  },
});
