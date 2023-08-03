import { createApp } from 'vue';
import App from './app.vue';
// 引入组件，全局挂载组件库，进行使用
import licaige from '@licaige/components';
const app = createApp(App);
app.use(licaige);

app.mount('#app');
