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
      if (isClient) {
        config.module.rules.push({
          test: /\.pug$/,
          loader: "pug-plain-loader",
        });
      }
    },
  },
  modules: ["@element-plus/nuxt"],
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
  vueCompilerOptions: {
    plugins: ["@volar/vue-language-plugin-pug"],
  },
  extends: "./.nuxt/tsconfig.json",
  include: ["env.d.ts", ".nuxt/nuxt.d.ts", "**/*"],
});
