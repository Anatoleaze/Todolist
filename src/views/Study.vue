import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import { formatDateShort } from "@/utils/formatDate";
<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/Lists"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>

    <ion-content class="overflow-auto">
      <div class="flex flex-col justify-center items-center mt-2">
        <div class="text-center">
          <ion-icon
            :icon="book"
            size="large"
            class="text-indigo-400"
          ></ion-icon>
        </div>

        <div class="text-center">
          <ion-card-title class="text-2xl">Études</ion-card-title>
          <ion-card-subtitle
            >{{ tasksStudy.length }} Tâches</ion-card-subtitle
          >
        </div>
      </div>

      <div>
        <ion-list>
          <ion-list-header>
            <ion-label
              >En retard
              <span class="text-gray-600 text-base">{{
                late.length
              }}</span></ion-label
            >
          </ion-list-header>
          <ion-item-sliding v-for="item in late" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item detail="true">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p style="color:red">{{ formatDateShort(item.dueDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                @click="doneTask(item)"
                color="primary"
                expandable
              >
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label
              >Aujourd'hui
              <span class="text-gray-600 text-base">{{
                today.length
              }}</span></ion-label
            >
          </ion-list-header>
          <ion-item-sliding v-for="item in today" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item detail="true">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p>{{ formatDateShort(item.dueDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                @click="doneTask(item)"
                color="primary"
                expandable
              >
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label
              >Plus tard
              <span class="text-gray-600 text-base">{{
                later.length
              }}</span></ion-label
            >
          </ion-list-header>
          <ion-item-sliding v-for="item in later" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item detail="true">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p>{{ formatDateShort(item.dueDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                @click="doneTask(item)"
                color="primary"
                expandable
              >
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label
              >Terminé
              <span class="text-gray-600 text-base">{{
                done.length
              }}</span></ion-label
            >
          </ion-list-header>
          <ion-item-sliding v-for="item in done" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item detail="true">
              <ion-label>
                <h2 style="color:#3490dc">
                  <s>{{ item.task }}</s>
                </h2>
                <p>
                  <s>{{ formatDateShort(item.dueDate) }}</s>
                </p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                @click="notDoneTask(item)"
                color="white"
                expandable
              >
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>
    </ion-content>

    <div>
      <ion-fab
        @click="isOpenNewTask = true"
        vertical="bottom"
        horizontal="end"
        slot="fixed"
      >
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-modal :is-open="isOpenNewTask" @didDismiss="isOpenNewTask = false">
        <new-task @closeModal="isOpenNewTask = false" />
      </ion-modal>
    </div>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonToolbar,
  IonIcon,
  IonContent,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonModal,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/vue";
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import { ellipsisVertical, book, add, trash } from "ionicons/icons";
import { useStore } from "vuex";
import NewTask from "@/components/NewTask.vue";
export default defineComponent({
  components: {
    IonPage,
    IonToolbar /*IonButtons*/,
    IonIcon,
    IonContent /*IonButton */,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButtons,
    IonBackButton,
    NewTask,
    IonFab,
    IonFabButton,
    IonModal,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  },
  setup() {
    const store = useStore();
    const isOpenNewTask = ref(false);
    const tasksStudy = computed(() => store.getters.tasksByCategory("Study"));
    const today = computed(() => store.getters.today(tasksStudy.value));
    const late = computed(() => store.getters.late(tasksStudy.value));
    const later = computed(() => store.getters.later(tasksStudy.value));
    const done = computed(() => store.getters.done(tasksStudy.value));
    function getTasksStudy() {
      store.dispatch("getTasks");
    }
    function doneTask(item) {
      store.dispatch("doneTask", item);
    }
    function notDoneTask(item) {
      store.dispatch("notDoneTask", item);
    }
    function deleteTask(item) {
      store.dispatch("deleteTask", item);
    }
    onMounted(() => {
      // ...
      if (store.state.tasks.length == 0) {
        getTasksStudy();
      }
    });
    return {
      tasksStudy,
      today,
      late,
      later,
      done,
      getTasksStudy,
      doneTask,
      notDoneTask,
      store,
      isOpenNewTask,
      deleteTask,
      ellipsisVertical,
      book,
      add,
      trash,
      formatDateShort,
    };
  },
});
</script>

<style></style>
