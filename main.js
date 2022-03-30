import { createApp } from 'vue'
import App from './App.vue'
import Router from "./router"

import mitt from "mitt"
import './registerServiceWorker'

let app = createApp(App);
let emiiter = mitt();
app.config.globalProperties.emitter = emiiter;

app.use(Router).mount('#app')
