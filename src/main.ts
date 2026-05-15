import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Tailwindcss */
import "./assets/css/style.css";

import store from "./store/index";

import { auth } from "./firebase";
import { signInAnonymously } from "firebase/auth";


const app = createApp(App);

app.use(IonicVue);
app.use(router);
app.use(store);

// 🔥 Connexion anonyme Firebase
signInAnonymously(auth)
  .then(() => {
    console.log("Firebase anonymous auth success");

    router.isReady().then(() => {
      app.mount("#app");
    });

    router.afterEach(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

  })
  .catch((error) => {
    console.error("Firebase auth error:", error);
  }); 