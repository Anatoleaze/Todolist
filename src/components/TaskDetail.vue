<template>
  <ion-page>
    <ion-content class="ion-padding">

      <div v-if="task" class="mt-2">

        <!-- Titre -->

        <div class="margin-bottom-2 flex items-center justify-center gap-2">
          <h2 class="text-center text-2xl font-semibold m-0">
            {{ truncatedTaskName }}
          </h2>
          <ion-icon
            :icon="pencil"
            class="text-xl cursor-pointer ml-2"
            @click="editTask"
            title="Modifier la tâche"
          ></ion-icon>
        </div>

        <!-- Catégorie -->
        <div class="detail-section">
          <p class="detail-text">
            <ion-icon :icon="grid" color="primary"></ion-icon>
            <strong> Catégorie :</strong>
            {{ getCategoryLabel(task.category) }}
          </p>
        </div>

        <!-- Date -->
        <div class="detail-section">
          <p class="detail-text">
            <ion-icon :icon="notifications" color="primary"></ion-icon>
            <strong> Date et Heure :</strong>
            {{ formatDateShort(task.dueDate) }}
          </p>
        </div>

        <!-- Description -->
        <div class="detail-section">
          <p class="detail-text">
            <ion-icon :icon="document" color="primary"></ion-icon>
            <strong> Description :</strong>
          </p>

          <p
            v-if="task.note"
            class="description-text"
          >
            {{ task.note }}
          </p>

          <p
            v-else
            class="description-text italic text-gray-500"
          >
            Aucune description.
          </p>
        </div>

      </div>

      <div v-else class="detail-container">
        <p class="detail-text">Aucune tâche sélectionnée.</p>
      </div>

      <!-- Bouton fermeture -->
      <ion-fab
        vertical="top"
        horizontal="end"
        slot="fixed"
        class="cursor-pointer"
        @click="closeModal"
      >
        <ion-icon
          :icon="closeIcon"
          class="text-3xl"
        ></ion-icon>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { formatDateShort } from "@/utils/formatDate";

import {
  IonPage,
  IonContent,
  IonFab,
  IonIcon,
} from "@ionic/vue";

import {
  close as closeIcon,
  grid,
  notifications,
  document,
  pencil,
} from "ionicons/icons";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonFab,
    IonIcon,
  },

  props: {
    task: {
      type: Object,
      default: null,
    },
  },

  setup(props, { emit }) {

    const categoryMap = {
      Work: "Travail",
      Music: "Musique",
      Travel: "Voyage",
      Study: "Étude",
      Home: "Maison",
      Shopping: "Shopping",
      Sport: "Sport",
    };

    const truncatedTaskName = computed(() => {
      if (props.task && props.task.task) {
        const maxLength = 60;

        return props.task.task.length > maxLength
          ? props.task.task.substring(0, maxLength) + "..."
          : props.task.task;
      }

      return "";
    });

    const getCategoryLabel = (category) => {
      return categoryMap[category] || category;
    };


    const closeModal = () => {
      emit("closeModal");
    };

    const editTask = () => {
      emit("editTask", props.task);
    };

    return {
      formatDateShort,
      truncatedTaskName,
      getCategoryLabel,
      closeIcon,
      grid,
      notifications,
      document,
      pencil,
      closeModal,
      editTask,
    };
  },
});
</script>

<style scoped>
.detail-container {
  max-width: 100%;
  margin: 20px 0;
}

.detail-section {
  margin: 15px 0;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.detail-text {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.description-text {
  margin-top: 10px;
  margin-left: 30px;
  line-height: 1.6;
  color: #444;
  word-break: break-word;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>