<template>
  <ion-page>
    <ion-content class="ion-padding">

      <div :key="formKey">
        <h2 class="text-center text-2xl font-semibold">
          {{ isEditMode ? "Modifier la tâche" : "Nouvelle tâche" }}
        </h2>

        <Form
          @submit="onSubmit"
          :initial-values="initialValues"
          v-slot="{ values, setFieldValue }"
        >

          <!-- TASK -->
          <ion-item>
            <ion-label>Nom</ion-label>

            <Field name="taskField" :rules="isRequired" v-slot="{ field }">
              <ion-input
                :model-value="field.value"
                @ionInput="field.onChange($event.target.value)"
                placeholder="Nom de la tâche"
              />
            </Field>
          </ion-item>

          <ion-item lines="none">
            <ErrorMessage name="taskField" v-slot="{ message }">
              <ion-text color="danger">{{ message }}</ion-text>
            </ErrorMessage>
          </ion-item>

          <!-- DATE (FIX IONIC OFFICIEL) -->
          <ion-item>
            <ion-icon :icon="notifications" slot="start" color="primary" />

            <ion-datetime-button datetime="dueDatePicker" />

            <ion-modal keep-contents-mounted="true">
              <ion-datetime
                id="dueDatePicker"
                :model-value="values.duedateField"
                @ionChange="setFieldValue('duedateField', $event.detail.value)"
                presentation="date-time"
              />
            </ion-modal>
          </ion-item>

          <ion-item lines="none">
            <ErrorMessage name="duedateField" v-slot="{ message }">
              <ion-text color="danger">{{ message }}</ion-text>
            </ErrorMessage>
          </ion-item>

          <!-- NOTE -->
          <ion-item>
            <ion-icon :icon="document" slot="start" color="primary" />
            <ion-textarea v-model="note" placeholder="Précisez cette tâche." />
          </ion-item>

          <!-- CATEGORY -->
          <ion-item>
            <ion-icon :icon="grid" slot="start" color="primary" />
            <ion-label>Catégorie</ion-label>

            <Field name="categoryField" :rules="isRequired" v-slot="{ field }">
              <ion-select
                :value="field.value"
                @ionChange="field.onChange($event.detail.value)"
              >
                <ion-select-option value="Work">Travail</ion-select-option>
                <ion-select-option value="Music">Music</ion-select-option>
                <ion-select-option value="Travel">Voyage</ion-select-option>
                <ion-select-option value="Study">Étude</ion-select-option>
                <ion-select-option value="Home">Maison</ion-select-option>
                <ion-select-option value="Shopping">Shopping</ion-select-option>
                <ion-select-option value="Sport">Sport</ion-select-option>
              </ion-select>
            </Field>
          </ion-item>

          <ion-item lines="none">
            <ErrorMessage name="categoryField" v-slot="{ message }">
              <ion-text color="danger">{{ message }}</ion-text>
            </ErrorMessage>
          </ion-item>

          <!-- SUBMIT -->
          <ion-button expand="block" type="submit" class="mt-6">
            {{ isEditMode ? "Modifier la tâche" : "Créer la tâche" }}
          </ion-button>

        </Form>
      </div>

      <!-- CLOSE -->
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button @click="closeModal">
          <ion-icon :icon="close" />
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonText,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonFab,
  IonFabButton,
} from "@ionic/vue";

import {
  close,
  notifications,
  document,
  grid,
} from "ionicons/icons";

import { Form, Field, ErrorMessage } from "vee-validate";

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default defineComponent({
  props: {
    editTask: { type: Object, default: null },
  },

  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonText,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonFab,
    IonFabButton,
    Form,
    Field,
    ErrorMessage,
  },

  setup(props, { emit }) {
    const note = ref("");
    const formKey = ref(0);

    const isEditMode = computed(() => !!props.editTask);

    const getNowIso = () => new Date().toISOString().slice(0, 19);

    const normalizeDate = (v) =>
      v ? v.toString().slice(0, 19) : getNowIso();

    const initialValues = ref({
      taskField: "",
      duedateField: getNowIso(),
      categoryField: "",
    });

    const isRequired = (v) => (v ? true : "Champ obligatoire");

    function setForm(task) {
      initialValues.value = {
        taskField: task?.task || "",
        duedateField: normalizeDate(task?.dueDate),
        categoryField: task?.category || "",
      };

      note.value = task?.note || "";
      formKey.value = Date.now();
    }

    watch(
      () => props.editTask,
      (val) => setForm(val),
      { immediate: true }
    );

    async function onSubmit(values) {
      if (isEditMode.value) {
        const refTask = doc(db, "tasks", props.editTask.id);

        await updateDoc(refTask, {
          task: values.taskField,
          note: note.value,
          dueDate: values.duedateField,
          category: values.categoryField,
        });

        emit("taskUpdated");
        emit("closeModal");
      } else {
        await addDoc(collection(db, "tasks"), {
          task: values.taskField,
          note: note.value,
          dueDate: values.duedateField,
          category: values.categoryField,
          done: false,
        });

        emit("closeModal");
      }
    }

    function closeModal() {
      emit("closeModal");
    }

    return {
      note,
      formKey,
      isEditMode,
      initialValues,
      onSubmit,
      isRequired,
      closeModal,
      close,
      notifications,
      document,
      grid,
    };
  },
});
</script>

<style scoped></style>