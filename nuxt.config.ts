export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },
    ssr: false,
    modules: ["@nuxt/ui", "@nuxtjs/i18n"],
    css: ["~/assets/css/main.css"],
    app: {
        buildAssetsDir: "assets",
    },
    i18n: {
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "zh", name: "中文", file: "zh.json" },
        ],
        defaultLocale: "en",
        langDir: "locales",
        strategy: "prefix_except_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            redirectOn: "all",
        },
    },
});
