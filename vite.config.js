import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { SERVER_API, LOCAL_HOST, PORT, HMR_OVERLAY } from './src/config/local'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ArcoResolver()],
            }),
            Components({
                resolvers: [
                    ArcoResolver({
                        sideEffect: true,
                    }),
                ],
            }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@image': resolve(__dirname, 'src/assets/image'),
                '@components': resolve(__dirname, 'src/components'),
                '@config': resolve(__dirname, 'src/config'),
                '@utils': resolve(__dirname, 'src/utils'),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/global.scss";',
                    charset: false,
                },
            },
        },
        server: {
            host: LOCAL_HOST || 'localhost',
            port: PORT,
            strictPort: false, // 是否强制使用指定端口，默认为 false
            proxy: {
                '^/(api)': {
                    target: SERVER_API,
                    changeOrigin: true,
                },
            },
            hmr: {
                overlay: HMR_OVERLAY,
                host: LOCAL_HOST || 'localhost',
                port: PORT,
            },
        },
    }
})
