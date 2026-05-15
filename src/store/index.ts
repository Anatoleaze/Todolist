import { createStore } from "vuex"

import { db } from "@/firebase"
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"

const store = createStore({
  state: {
    tasks: [] as any[],

    options: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h24",
    },

    isToday(date: Date) {
      const today = new Date()

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }
  },

  getters: {
    today: (state) => (tasks: any[]) =>
      tasks.filter((item) => {
        return (
          state.isToday(new Date(item.dueDate)) &&
          item.done === false
        )
      }),

    late: (state) => (tasks: any[]) =>
      tasks.filter((item) => {
        return (
          new Date(item.dueDate).getTime() < new Date().getTime() &&
          item.done === false
        )
      }),

    later: (state) => (tasks: any[]) =>
      tasks.filter((item) => {
        return (
          new Date(item.dueDate).getTime() > new Date().getTime() &&
          !state.isToday(new Date(item.dueDate)) &&
          item.done === false
        )
      }),

    done: () => (tasks: any[]) =>
      tasks.filter((item) => item.done === true),

    tasksByCategory: (state) => (category: string) =>
      state.tasks.filter((item) => item.category === category),

    lengthTasksByCategory: (state) => (category: string) =>
      state.tasks.filter((item) => item.category === category).length
  },

  mutations: {
    // 🔥 REALTIME FETCH FIRESTORE v9
    getTasks(state) {
      state.tasks = []

      const colRef = collection(db, "tasks")

      onSnapshot(colRef, (querySnapshot) => {
        state.tasks = []

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data()

          state.tasks.push({
            id: docSnap.id,
            task: data.task,
            dueDate: new Date(data.dueDate).toLocaleDateString(
              "fr-FR",
              state.options
            ),
            category: data.category,
            note: data.note,
            done: data.done,
          })
        })
      })
    },

    // ✅ MARK DONE
    doneTask(state, payload) {
      if (!payload.done) {
        const ref = doc(db, "tasks", payload.id)

        updateDoc(ref, {
          done: true
        }).then(() => {
          console.log("Task done")
        }).catch(console.error)
      }
    },

    // 🔄 MARK NOT DONE
    notDoneTask(state, payload) {
      if (payload.done) {
        const ref = doc(db, "tasks", payload.id)

        updateDoc(ref, {
          done: false
        }).then(() => {
          console.log("Task not done")
        }).catch(console.error)
      }
    },

    // 🗑 DELETE TASK
    deleteTask(state, payload) {
      const ref = doc(db, "tasks", payload.id)

      deleteDoc(ref)
        .then(() => {
          console.log("Task deleted")
        })
        .catch(console.error)
    }
  }
})

export default store