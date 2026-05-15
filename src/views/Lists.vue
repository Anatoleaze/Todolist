<template>
  <ion-page>
    <div class="flex w-full flex-col overflow-auto">
      <div class="mt-2">
        <h1 class="text-4xl pl-5 font-semibold">Liste</h1>
      </div>
      <div class="flex w-full flex-row flex-wrap justify-around mt-2">
        <ion-card class="w-2/5">
          <router-link :to="{ name: 'All' }">
            <ion-card-header>
              <ion-icon :icon="clipboard" color="primary" size="large">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Tout</ion-card-title>
              <ion-card-subtitle>{{ lengthOfAllTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Work' }">
            <ion-card-header>
              <ion-icon :icon="briefcase" size="large" class="text-yellow-800">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Travail</ion-card-title>
              <ion-card-subtitle>{{ lengthOfWorkTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Music' }">
            <ion-card-header>
              <ion-icon :icon="headset" size="large" class="text-red-400">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Musique</ion-card-title>
              <ion-card-subtitle>{{ lengthOfMusicTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Travel' }">
            <ion-card-header>
              <ion-icon :icon="airplane" size="large" class="text-green-400">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Voyage</ion-card-title>
              <ion-card-subtitle>{{ lengthOfTravelTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Study' }">
            <ion-card-header>
              <ion-icon :icon="book" size="large" class="text-indigo-400">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Études</ion-card-title>
              <ion-card-subtitle>{{ lengthOfStudyTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Home' }">
            <ion-card-header>
              <ion-icon :icon="home" size="large" style="color:#2DD4BF">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Maison</ion-card-title>
              <ion-card-subtitle>{{ lengthOfHomeTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Sport' }">
            <ion-card-header>
              <ion-icon :icon="football" size="large" class="text-gray-900">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Sport</ion-card-title>
              <ion-card-subtitle>{{ lengthOfSportTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>

        <ion-card class="w-2/5">
          <router-link :to="{ name: 'Shopping' }">
            <ion-card-header>
              <ion-icon :icon="cart" size="large" style="color:#115E59">
              </ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">Shopping</ion-card-title>
              <ion-card-subtitle>{{ lengthOfShoppingTasks }} Tâches</ion-card-subtitle>
            </ion-card-content>
          </router-link>
        </ion-card>
      </div>

      <div>
        <ion-fab @click="isOpenNewTask = true" vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <ion-modal :is-open="isOpenNewTask" @didDismiss="isOpenNewTask = false">
          <new-task @closeModal="isOpenNewTask = false" />
        </ion-modal>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { computed, defineComponent, onMounted, ref, reactive } from "vue";
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonFab,
  IonFabButton,
  IonModal,
} from "@ionic/vue";
import {
  clipboard,
  briefcase,
  headset,
  airplane,
  book,
  home,
  football,
  cart,
  add,
} from "ionicons/icons";
import NewTask from "@/components/NewTask.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    IonPage,
    IonCard,
    IonCardHeader,
    IonIcon,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonFab,
    IonFabButton,
    IonModal,
    NewTask,
  },
  setup() {
    const isOpenNewTask = ref(false);
    const store = useStore();

    const lengthOfAllTasks = computed(() => store.state.tasks?.length ?? 0);
    const lengthOfWorkTasks = computed(() => store.getters.lengthTasksByCategory("Work"))
    const lengthOfMusicTasks = computed(() => store.getters.lengthTasksByCategory("Music"))
    const lengthOfTravelTasks = computed(() => store.getters.lengthTasksByCategory("Travel"))
    const lengthOfStudyTasks = computed(() => store.getters.lengthTasksByCategory("Study"))
    const lengthOfHomeTasks = computed(() => store.getters.lengthTasksByCategory("Home"))
    const lengthOfSportTasks = computed(() => store.getters.lengthTasksByCategory("Sport"))
    const lengthOfShoppingTasks = computed(() => store.getters.lengthTasksByCategory("Shopping"))

    function getTasks() {
      store.dispatch("getTasks");
    }

    onMounted(() => {
      if (store.state.tasks.length == 0) {
        getTasks();
      }
    });
    return {
      isOpenNewTask,
      store,
      //state,
      getTasks,
      clipboard,
      briefcase,
      headset,
      airplane,
      book,
      home,
      football,
      cart,
      add,
      lengthOfAllTasks,
      lengthOfWorkTasks,
      lengthOfMusicTasks,
      lengthOfTravelTasks,
      lengthOfStudyTasks,
      lengthOfHomeTasks,
      lengthOfSportTasks,
      lengthOfShoppingTasks,
    };
  },
});
</script>

<style scoped></style>
