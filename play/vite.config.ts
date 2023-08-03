import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore  组件命名
import DefineOptions from 'unplugin-vue-define-options/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), DefineOptions(), vueJsx()]
});
