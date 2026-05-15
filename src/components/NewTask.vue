<template>
  <ion-page>
    <div class="mt-2">
      <h2 class="text-center text-2xl font-semibold">Nouvelle tâche</h2>
    </div>

    <Form @submit="addTask()" class="flex flex-col justify-center h-full">
      <div>
        <ion-item>
          <Field
            v-slot="{ field }"
            name="taskField"
            :rules="isRequired"
            v-model="task"
          >
            <ion-input
              v-bind="field"
              type="text"
              name="taskField"
              placeholder="Qu'avez-vous prévu ?"
            ></ion-input>
          </Field>
        </ion-item>

        <ion-item lines="none">
          <ErrorMessage v-slot="{ message }" name="taskField">
            <ion-text color="danger" v-if="message">{{ message }}</ion-text>
          </ErrorMessage>
        </ion-item>
      </div>

      <div>
        <ion-item>
          <ion-icon
            :icon="notifications"
            color="primary"
            slot="start"
          ></ion-icon>
          <Field v-slot="{ field }" name="duedateField" :rules="isRequired">
            <ion-datetime
              v-bind="field"
              v-model="dueDate"
              presentation="date-time"
              locale="fr-FR"
              :prefer-wheel="false"
              show-default-buttons="true"
              done-text="Valider"
              cancel-text="Annuler"
              max="2055-12-31T23:59:59"
            >
            </ion-datetime>
          </Field>
        </ion-item>
        <ion-item lines="none">
          <ErrorMessage v-slot="{ message }" name="duedateField">
            <ion-text color="danger" v-if="message">{{ message }}</ion-text>
          </ErrorMessage>
        </ion-item>

        <ion-item>
          <ion-icon :icon="document" color="primary" slot="start"></ion-icon>
          <ion-textarea
            v-model="note"
            placeholder="Précisez cette tâche."
          ></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-icon :icon="grid" color="primary" slot="start"></ion-icon>
          <ion-label>Categorie</ion-label>

          <Field :rules="isRequired" v-slot="{ field }" name="categoryField">
            <ion-select
              v-bind="field"
              v-model="category"
              label="Catégorie"
              placeholder="Sélectionner une catégorie"
            >
              <ion-select-option value="Work">Travail</ion-select-option>
              <ion-select-option value="Music">Music</ion-select-option>
              <ion-select-option value="Travel">Voyage</ion-select-option>
              <ion-select-option value="Study">Etude</ion-select-option>
              <ion-select-option value="Home">Maison</ion-select-option>
              <ion-select-option value="Shopping">Shopping</ion-select-option>
              <ion-select-option value="Sport">Sport</ion-select-option>
            </ion-select>
          </Field>
        </ion-item>
        <ion-item lines="none">
          <ErrorMessage v-slot="{ message }" name="categoryField">
            <ion-text color="danger" v-if="message">{{ message }}</ion-text>
          </ErrorMessage>
        </ion-item>
      </div>

      <div class="mt-8">
        <ion-button expand="block" type="submit">Créer la tâche</ion-button>
      </div>
    </Form>

    <ion-fab
      vertical="top"
      horizontal="end"
      slot="fixed"
      class="cursor-pointer"
      @click="$emit('closeModal')"
    >
      <ion-icon :icon="close" class="text-3xl"></ion-icon>
    </ion-fab>
  </ion-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonFab,
  IonIcon,
  IonItem,
  IonInput,
  IonText,
  IonDatetime,
  IonTextarea,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { close, notifications, document, grid } from "ionicons/icons";
import { Form, Field, ErrorMessage } from "vee-validate";
import { collection, addDoc } from "firebase/firestore"

export default defineComponent({
  components: {
    IonPage,
    IonFab,
    IonIcon,
    IonItem,
    IonInput,
    IonText,
    IonDatetime,
    IonTextarea,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    Form,
    Field,
    ErrorMessage,
  },

  setup(props, { emit }) {
    const task = ref("");
    const dueDate = ref("");
    const note = ref("");
    const category = ref("");
    const isRequired = (value) => {
      if (!value) {
        return "Ce champs est obligatoire";
      }
      return true;
    };

    async function addTask() {
      try {
        await addDoc(collection(db, "tasks"), {
          task: task.value,
          note: note.value,
          dueDate: dueDate.value,
          category: category.value,
          done: false,
        })

        task.value = ""
        dueDate.value = ""
        note.value = ""
        category.value = ""

        console.log("Document successfully written!")
      } catch (error) {
        console.log("Error writing document: ", error)
      }
    }
    return {
      isRequired,
      task,
      dueDate,
      note,
      category,
      addTask,
      close,
      notifications,
      document,
      grid,
    };
  },
});
</script>

<style></style>
