/*
 * @Author: bmqy bmqy@qq.com
 * @Date: 2023-12-08 09:34:34
 * @LastEditors: bmqy bmqy@qq.com
 * @LastEditTime: 2024-04-07 09:24:32
 * @FilePath: \auto-type-confirm-text\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: '自动输入二次确认文本',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAcJJREFUeF7tWttxwjAQXDohnZBOoBJCJaSTpBPoBHIZG2SPjM6nEyNbqx8zg3QjrXfvYd0GjY9N4+cHASADGkeAEmicAHSClEDFEtgBOAKQ55zxC+D0t06eyVEzAy4AtskTxCfI4T81a9cKwBXAx9IB2HcSmMuC1Uhg6gXeRn9ksThrsYZiBeYQADJgiEAWi7MWF6C3xmQxCUjCcc6IvZrNa+dIGOu9ufwORwoAiRqSQEkUiQ2xd+gTpZABP4asS3sg67yvLqubA4C8xKnD93YeeUIIwBhZ66Y915UCQPb4f/aaAfjuqDoGVCMBYUGqhkgCUKuDTAEwK4F6xQAC4ClmR1tkgDETjAJHCQRoWqnlyG6VKes+yYCYdCgBSuCJgFVbKuE6TrLukz6APmCIAGuBVDXIWsDRcXmaohNkLRBxZgqKMQwyDDIMDhBgHsA8oOLP4iVvhnodJCWgiCzFp7z1YqSlq7FHD1GY71u7skrRQG6GpNvrbZejpQ7ibddaC0T3UWvF9wo0AmAshsiAGAKUgLeHcrRnjUqraZRkr3BGwxZ7hdfQLu/oTqZNLTEKuAJDAFzhXKAxMmCBL811y80z4A7Z+otB27V0OwAAAABJRU5ErkJggg==',
        namespace: 'npm/vite-plugin-monkey',
        match: [
            'https://github.com/*',
            'https://gitee.com/*',
            'https://codeup.aliyun.com/*',
            'https://vercel.com/*',
            'https://dash.cloudflare.com/*',
        ],
      },
    }),
  ],
});
