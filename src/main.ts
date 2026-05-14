import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/index"

import { IonicVue } from "@ionic/vue"

/* Ionic core */
import "@ionic/vue/css/core.css"
import "@ionic/vue/css/normalize.css"
import "@ionic/vue/css/structure.css"
import "@ionic/vue/css/typography.css"
import "@ionic/vue/css/padding.css"
import "@ionic/vue/css/float-elements.css"
import "@ionic/vue/css/text-alignment.css"
import "@ionic/vue/css/text-transformation.css"
import "@ionic/vue/css/flex-utils.css"
import "@ionic/vue/css/display.css"

/* Theme */
import "./theme/variables.css"

/* Custom styles (IMPORTANT FIX) */
import "./assets/css/style.css"

const app = createApp(App)

app.use(IonicVue)
app.use(router)
app.use(store)

router.isReady().then(() => {
  app.mount("#app")
})