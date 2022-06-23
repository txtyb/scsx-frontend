import { createApp } from 'vue'
import App from './App.vue'

import Fect from '@fect-ui/vue'
import '@fect-ui/themes'
import '@fect-ui/vue/dist/cjs/main.css'

createApp(App).use(Fect).mount('#app')
