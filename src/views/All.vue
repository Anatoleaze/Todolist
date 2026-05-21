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
          <ion-icon :icon="clipboard" size="large" color="primary"></ion-icon>
        </div>

        <div class="text-center">
          <ion-card-title class="text-2xl">Tout</ion-card-title>
          <ion-card-subtitle>{{ state.tasks.length }} Tâches</ion-card-subtitle>
        </div>
      </div>

      <div>
        <ion-list>
          <ion-list-header>
            <ion-label>En retard
              <span class="text-gray-600 text-base">{{
                state.late.length
              }}</span></ion-label>
          </ion-list-header>
          <ion-item-sliding v-for="item in state.late" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item :detail="true" @click="openTaskDetail(item)">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p style="color:red">{{ formatDateShort(item.dueDate) }}</p>
              </ion-label>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option @click="doneTask(item)" color="primary" expandable>
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>

        <ion-list>
          <ion-list-header>
            <ion-label>Aujourd'hui
              <span class="text-gray-600 text-base">{{
                state.today.length
              }}</span></ion-label>
          </ion-list-header>
          <ion-item-sliding v-for="item in state.today" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item :detail="true" @click="openTaskDetail(item)">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p>{{ formatDateShort(item.dueDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option @click="doneTask(item)" color="primary" expandable>
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label>Plus Tard
              <span class="text-gray-600 text-base">{{
                state.later.length
              }}</span></ion-label>
          </ion-list-header>
          <ion-item-sliding v-for="item in state.later" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item :detail="true" @click="openTaskDetail(item)">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p>{{ formatDateShort(item.dueDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option @click="doneTask(item)" color="primary" expandable>
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label>Terminé
              <span class="text-gray-600 text-base">{{
                state.done.length
              }}</span></ion-label>
          </ion-list-header>
          <ion-item-sliding v-for="item in state.done" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item :detail="true" @click="openTaskDetail(item)">
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
              <ion-item-option @click="notDoneTask(item)" color="light" expandable>
                <ion-checkbox :checked="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>
    </ion-content>

    <div>
      <ion-fab @click="openCreateModal" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
        <new-task v-if="!isDetailMode" @closeModal="closeModal" />
        <task-detail v-else :task="selectedTask" @closeModal="closeModal" />
      </ion-modal>

    </div>
  </ion-page>
</template>

<script>
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { formatDateShort } from "@/utils/formatDate";
import {
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonContent,
  IonCardTitle,
  IonCardSubtitle,
  IonListHeader,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonCheckbox,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonModal,
} from "@ionic/vue";
import { ellipsisVertical, clipboard, trash, add } from "ionicons/icons";
import NewTask from "@/components/NewTask.vue";
import TaskDetail from '@/components/TaskDetail.vue'
import { useTodoStore } from '@/store/todoStore';
export default defineComponent({
  components: {
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonContent,
    IonCardTitle,
    IonCardSubtitle,
    IonListHeader,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonCheckbox,
    IonList,
    IonItem,
    IonFab,
    IonFabButton,
    IonModal,
    NewTask,
    TaskDetail,
  },
  setup() {
    const isModalOpen = ref(false);
    const isDetailMode = ref(false);
    const selectedTask = ref(null);
    const todoStore = useTodoStore();

    const state = reactive({
      tasks: computed(() => todoStore.tasks),
      today: computed(() => todoStore.today(todoStore.tasks)),
      late: computed(() => todoStore.late(todoStore.tasks)),
      later: computed(() => todoStore.later(todoStore.tasks)),
      done: computed(() => todoStore.done(todoStore.tasks)),
    });

    function doneTask(item) {
      todoStore.doneTask(item);
    }
    function notDoneTask(item) {
      todoStore.notDoneTask(item);
    }
    function deleteTask(item) {
      todoStore.deleteTask(item);
    }

    function openCreateModal() {
      isDetailMode.value = false;
      isModalOpen.value = true;
    }

    function openTaskDetail(item) {
      selectedTask.value = item;
      isDetailMode.value = true;
      isModalOpen.value = true;
    }

    function closeModal() {
      isModalOpen.value = false;
    }

    onMounted(() => {
      if (todoStore.tasks.length === 0) {
        todoStore.getTasks();
      }
    });

    function onModalDismiss() {
      isDetailMode.value = false;
      selectedTask.value = null;
    }

    return {
      state,
      doneTask,
      notDoneTask,
      deleteTask,
      openCreateModal,
      openTaskDetail,
      closeModal,
      onModalDismiss,
      isModalOpen,
      isDetailMode,
      selectedTask,
      ellipsisVertical,
      clipboard,
      trash,
      add,
      formatDateShort,
    };
  },
});
</script>

<style></style>