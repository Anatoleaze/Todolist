<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="mt-2">
        <h2 class="text-center text-2xl font-semibold">Nouvelle tâche</h2>
      </div>

      <form @submit.prevent="onSubmit" class="flex flex-col justify-center h-full gap-4 mt-6">
        <div>
          <ion-item>
          <ion-icon :icon="notifications" color="primary" slot="start"></ion-icon>
          <ion-input
            v-model="taskName"
            label="Nom"
            label-placement="stacked"
            placeholder="Entrez le nom"
          />
        </ion-item>
      </div>

      <div>
        <ion-item>
          <ion-icon :icon="notifications" color="primary" slot="start"></ion-icon>
          <ion-datetime
            v-model="dueDate"
            label="Date d'échéance"
            label-placement="stacked"
            presentation="date-time"
            prefer-wheel="true"
            class="datetime-field"
          />
        </ion-item>
      </div>

      <div>
        <ion-item>
          <ion-icon :icon="document" color="primary" slot="start"></ion-icon>
          <ion-textarea
            v-model="description"
            label="Description"
            label-placement="stacked"
            placeholder="Précisez cette tâche..."
          ></ion-textarea>
        </ion-item>
      </div>

      <div>
        <ion-item>
          <ion-icon :icon="grid" color="primary" slot="start"></ion-icon>
          <ion-select
            v-model="category"
            label="Catégorie"
            label-placement="stacked"
            placeholder="Sélectionner une catégorie"
          >
              <ion-select-option value="Travel">Voyage</ion-select-option>
              <ion-select-option value="Study">Etude</ion-select-option>
              <ion-select-option value="Home">Maison</ion-select-option>
              <ion-select-option value="Shopping">Shopping</ion-select-option>
              <ion-select-option value="Sport">Sport</ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <div class="mt-8">
          <ion-button expand="block" type="submit">Créer la tâche</ion-button>
        </div>
      </form>

      <ion-fab vertical="top" horizontal="end" slot="fixed" class="cursor-pointer" @click="closeModal">
        <ion-icon :icon="close" class="text-3xl"></ion-icon>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonContent,
  IonFab,
  IonIcon,
  IonItem,
  IonInput,
  IonDatetime,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { close, notifications, document, grid } from "ionicons/icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonFab,
    IonIcon,
    IonItem,
    IonInput,
    IonDatetime,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
  },

  setup(props, { emit }) {
    const taskName = ref("");
    const dueDate = ref(new Date().toISOString());
    const description = ref("");
    const category = ref("");

    const onSubmit = async () => {
      const newTask = {
        task: taskName.value.trim(),
        note: description.value.trim(),
        dueDate: dueDate.value,
        category: category.value,
        done: false,
      };

      try {
        await addDoc(collection(db, "tasks"), newTask);

        // Réinitialiser les champs
        taskName.value = "";
        dueDate.value = new Date().toISOString();
        description.value = "";
        category.value = "";

        console.log("Tâche créée avec succès!");
        emit("closeModal");
      } catch (error) {
        console.error("Erreur lors de la création de la tâche: ", error);
        alert("Erreur lors de la création de la tâche");
      }
    };

    function closeModal() {
      emit("closeModal");
    }

    return {
      taskName,
      dueDate,
      description,
      category,
      onSubmit,
      closeModal,
      notifications,
      document,
      grid,
      close,
    };
  },
});
</script>

<style>
.datetime-field {
  min-height: 80px;
  width: 100%;
}
</style>
