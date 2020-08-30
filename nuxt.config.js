import path from 'path'
import fs from 'fs'
import { URL } from './config/var'

export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'spa',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    router: {
        middleware: ['auth'],
    },
    loading: false,
    /*
     ** Global CSS
     */
    css: ['normalize.css', '~/assets/scss/style.scss'],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        { src: '~/plugins/vuelidate', mode: 'client' },
        { src: '~/plugins/vue-modal', mode: 'client' },
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/pwa',
        'nuxt-webfontloader',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/api/auth/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: {
                        url: '/api/auth/user',
                        method: 'get',
                        propertyName: 'user',
                    },
                },
                // tokenRequired: true,
                // tokenType: 'bearer',
                // globalToken: true,
                // autoFetchUser: true
            },
        },
        redirect: {
            login: '/auth/login',
            home: '/',
        },
    },
    axios: {
        // baseURL: URL,
        proxy: true,
    },
    proxy: {
        '/api/': {
            target: 'http://192.168.0.3:9099/api',
            pathRewrite: { '^/api/': '' },
        },
        '/rk7api/': {
            target: 'https://192.168.8.101:52757/rk7api/v1/serverstatus.xml',
            pathRewrite: { '^/api/': '' },
        },
    },
    webfontloader: {
        events: false,
        google: {
            families: ['Roboto:400,500,600:cyrillic&display=swap'],
        },
        timeout: 5000,
    },
    server: {
        port: 3050,
        host: '0.0.0.0',
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
        },
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {},
}
