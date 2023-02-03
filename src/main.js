
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

// Plugins
import { registerPlugins } from '@/plugins'

import { messages } from './i18n.js' 
console.log(messages);
const i18n = createI18n({
    legacy:false,
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
})
const app = createApp(App)
app.use(i18n)

registerPlugins(app)

app.mount('#app')
