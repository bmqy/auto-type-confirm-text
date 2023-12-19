import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: '自动输入二次确认文本',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://github.com/bmqy/*/settings', 'https://gitee.com/bmqy/*/settings*', 'https://codeup.aliyun.com/*/settings*'],
      },
    }),
  ],
});
