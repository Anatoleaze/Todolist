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
        const d = new Date(item.dueDate)
        if (isNaN(d.getTime())) return false

        return state.isToday(d) && item.done === false
      }),

    late: () => (tasks: any[]) =>
      tasks.filter((item) => {
        const d = new Date(item.dueDate)
        if (isNaN(d.getTime())) return false

        return d.getTime() < new Date().getTime() && item.done === false
      }),

    later: (state) => (tasks: any[]) =>
      tasks.filter((item) => {
        const d = new Date(item.dueDate)
        if (isNaN(d.getTime())) return false

        return (
          d.getTime() > new Date().getTime() &&
          !state.isToday(d) &&
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
    setTasks(state, tasks: any[]) {
      state.tasks = tasks
    },
  },

  actions: {
    // 🔥 REALTIME FIRESTORE
    getTasks({ commit }) {
      const colRef = collection(db, "tasks")

      onSnapshot(colRef, (snapshot) => {
        const tasks: any[] = []

        snapshot.forEach((docSnap) => {
          const data = docSnap.data()

          tasks.push({
            id: docSnap.id,
            task: data.task,
            dueDate: data.dueDate, // 👈 on garde brut (important)
            category: data.category,
            note: data.note,
            done: data.done,
          })
        })

        commit("setTasks", tasks)
      },
      (error) => {
          console.error("Firestore error:", error)
      })
    },

    // ✅ MARK DONE
    async doneTask(_, payload) {
      if (!payload.done) {
        const ref = doc(db, "tasks", payload.id)

        try {
          await updateDoc(ref, { done: true })
          console.log("Task done")
        } catch (err) {
          console.error(err)
        }
      }
    },

    // 🔄 MARK NOT DONE
    async notDoneTask(_, payload) {
      if (payload.done) {
        const ref = doc(db, "tasks", payload.id)

        try {
          await updateDoc(ref, { done: false })
          console.log("Task not done")
        } catch (err) {
          console.error(err)
        }
      }
    },

    // 🗑 DELETE TASK
    async deleteTask(_, payload) {
      const ref = doc(db, "tasks", payload.id)

      try {
        await deleteDoc(ref)
        console.log("Task deleted")
      } catch (err) {
        console.error(err)
      }
    }
  }
})

export default store