import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.min.css'

createApp(App).use(router).use(store).use(ArcoVueIcon).mount('#app')
