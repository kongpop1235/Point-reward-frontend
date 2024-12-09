export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css', 'swiper/swiper-bundle.css'],
    modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    i18n: {
        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'th', name: 'ไทย', file: 'th.json' },
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/',
        strategy: 'prefix_and_default',
    },
    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:5000/api',
        },
    },
    router: {
        middleware: ['auth'],
    },
    vite: {
        plugins: [require('vite-svg-loader')()],
    },
})
