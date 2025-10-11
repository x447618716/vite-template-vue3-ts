import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/postcss';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import visualizer from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    const plugins = isProduction
        ? [
              visualizer({
                  filename: './dist/stats.html', // 报告输出路径
                  open: true, // 构建后自动打开
                  gzipSize: true, // 显示gzip压缩大小
                  brotliSize: true // 显示brotli压缩大小
              })
          ]
        : [basicSsl()];
    return {
        plugins: [
            vue(),
            vueDevTools(),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                resolvers: [ElementPlusResolver()],
                dirs: ['src/services/**', 'src/enums/**', 'src/hooks/**', 'src/utils/**', 'src/stores/modules/**'],
                dts: 'types/auto-imports.d.ts'
            }),
            Components({
                dirs: ['src/components'],
                resolvers: [ElementPlusResolver()],
                dts: 'types/components.d.ts'
            }),
            ...plugins
        ],
        build: {
            minify: isProduction ? 'terser' : false,
            terserOptions: isProduction
                ? {
                      compress: {
                          drop_console: true // 移除所有console.*
                      },
                      format: {
                          comments: false // 删除注释
                      }
                  }
                : undefined
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            postcss: {
                plugins: [tailwindcss(), autoprefixer()]
            }
        }
    };
});
