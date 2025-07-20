import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 将 @ 指向 src 目录
    },
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-px-to-viewport')({
          viewportWidth: 1440,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          exclude: /node_modules/i,
        }),
      ],
    },
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false, // 禁用 devtools 生产环境
    __VUE_OPTIONS_API__: true, // 启用 Options API
  },
});
