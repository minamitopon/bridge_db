export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
  },
  build: {
    mode: "development",
    devtools: true,
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
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
    storesDirs: ["./stores/**"],
  },
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "~/public/styles/_default.sass"',
        },
      },
    },
  },
  vueCompilerOptions: {
    plugins: ["@volar/vue-language-plugin-pug"],
  },
  extends: "./.nuxt/tsconfig.json",
  include: ["env.d.ts", ".nuxt/nuxt.d.ts", "**/*"],
  // css: ["~/public/styles/main.sass"],
  buildModules: ["@pinia/nuxt"],
});
