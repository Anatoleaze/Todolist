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
            :icon="football"
            size="large"
            class="text-gray-900"
          ></ion-icon>
        </div>

        <div class="text-center">
          <ion-card-title class="text-2xl">Sport</ion-card-title>
          <ion-card-subtitle>
            {{ state.tasksSport.length }} Tâches
          </ion-card-subtitle>
        </div>
      </div>

      <div>
        <!-- EN RETARD -->
        <ion-list>
          <ion-list-header>
            <ion-label>
              En retard
              <span class="text-gray-600 text-base">
                {{ state.late.length }}
              </span>
            </ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.late" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item :detail="true" @click="openTaskDetail(item)">
              <ion-label>
                <h2>{{ item.task }}</h2>
                <p style="color:red">
                  {{ formatDateShort(item.dueDate) }}
                </p>
              </ion-label>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option
                @click="doneTask(item)"
                color="primary"
                expandable
              >
                <ion-checkbox :model-value="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>

        <!-- AUJOURD'HUI -->
        <ion-list>
          <ion-list-header>
            <ion-label>
              Aujourd'hui
              <span class="text-gray-600 text-base">
                {{ state.today.length }}
              </span>
            </ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.today" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
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
              <ion-item-option
                @click="doneTask(item)"
                color="primary"
                expandable
              >
                <ion-checkbox :model-value="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>

        <!-- PLUS TARD -->
        <ion-list>
          <ion-list-header>
            <ion-label>
              Plus tard
              <span class="text-gray-600 text-base">
                {{ state.later.length }}
              </span>
            </ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.later" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
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
              <ion-item-option
                @click="doneTask(item)"
                color="primary"
                expandable
              >
                <ion-checkbox :model-value="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>

        <!-- TERMINÉ -->
        <ion-list>
          <ion-list-header>
            <ion-label>
              Terminé
              <span class="text-gray-600 text-base">
                {{ state.done.length }}
              </span>
            </ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.done" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option
                @click="deleteTask(item)"
                color="danger"
                expandable
              >
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
              <ion-item-option
                @click="notDoneTask(item)"
                color="white"
                expandable
              >
                <ion-checkbox :model-value="item.done"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>
    </ion-content>

    <!-- FAB -->
    <div>
      <ion-fab
        @click="openCreateModal"
        vertical="bottom"
        horizontal="end"
        slot="fixed"
      >
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- MODAL -->
      <ion-modal :is-open="isModalOpen" @didDismiss="onModalDismiss">

        <new-task
          v-if="modalMode === 'create'"
          :edit-task="null"
          @closeModal="closeModal"
          @taskUpdated="onTaskUpdated"
        />

        <new-task
          v-else-if="modalMode === 'edit'"
          :edit-task="editTaskData"
          @closeModal="closeModal"
          @taskUpdated="onTaskUpdated"
        />

        <task-detail
          v-else-if="modalMode === 'detail'"
          :task="selectedTask"
          @closeModal="closeModal"
          @editTask="onEditTask"
        />

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

import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  computed
} from "vue";

import { formatDateShort } from "@/utils/formatDate";

import {
  add,
  trash,
  football
} from "ionicons/icons";

import NewTask from "@/components/NewTask.vue";
import TaskDetail from "@/components/TaskDetail.vue";

import { useTodoStore } from "@/store/todoStore";

export default defineComponent({
  components: {
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
    NewTask,
    TaskDetail,
  },

  setup() {

    const isModalOpen = ref(false);

    // create | edit | detail | none
    const modalMode = ref("none");

    const selectedTask = ref(null);
    const editTaskData = ref(null);

    const todoStore = useTodoStore();

    const tasksSport = computed(() =>
      todoStore.tasksByCategory("Sport")
    );

    const state = reactive({
      tasksSport,

      today: computed(() =>
        todoStore.today(tasksSport.value)
      ),

      late: computed(() =>
        todoStore.late(tasksSport.value)
      ),

      later: computed(() =>
        todoStore.later(tasksSport.value)
      ),

      done: computed(() =>
        todoStore.done(tasksSport.value)
      ),
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
      modalMode.value = "create";

      editTaskData.value = null;
      selectedTask.value = null;

      isModalOpen.value = true;
    }

    function openTaskDetail(item) {
      selectedTask.value = item;

      modalMode.value = "detail";

      isModalOpen.value = true;
    }

    function onEditTask(task) {
      modalMode.value = "edit";

      editTaskData.value = { ...task };

      isModalOpen.value = true;
    }

    function onTaskUpdated() {
      closeModal();
    }

    function closeModal() {
      editTaskData.value = null;
      selectedTask.value = null;

      modalMode.value = "none";

      isModalOpen.value = false;
    }

    function onModalDismiss() {
      modalMode.value = "none";

      selectedTask.value = null;
      editTaskData.value = null;

      isModalOpen.value = false;
    }

    onMounted(() => {
      if (todoStore.tasks.length === 0) {
        todoStore.getTasks();
      }
    });

    return {
      state,
      doneTask,
      notDoneTask,
      deleteTask,
      openCreateModal,
      closeModal,
      openTaskDetail,
      onEditTask,
      onTaskUpdated,
      onModalDismiss,
      isModalOpen,
      modalMode,
      selectedTask,
      editTaskData,
      add,
      trash,
      football,
      formatDateShort,
    };
  },
});
</script>

<style></style>