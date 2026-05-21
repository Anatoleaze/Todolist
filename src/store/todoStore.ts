import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [] as any[],
    options: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h24',
    },
  }),
  getters: {
    isToday: () => (date: Date) => {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    },
    today: (state) => (tasks: any[]) =>
      tasks.filter((item) => {
        const d = new Date(item.dueDate)
        if (isNaN(d.getTime())) return false
        return (useTodoStore().isToday(d) && item.done === false)
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
          !useTodoStore().isToday(d) &&
          item.done === false
        )
      }),
    done: () => (tasks: any[]) =>
      tasks.filter((item) => item.done === true),
    tasksByCategory: (state) => (category: string) =>
      state.tasks.filter((item) => item.category === category),
    lengthTasksByCategory: (state) => (category: string) =>
      state.tasks.filter((item) => item.category === category).length,
  },
  actions: {
    getTasks() {
      const colRef = collection(db, 'tasks')
      onSnapshot(colRef, (snapshot) => {
        const tasks: any[] = []
        snapshot.forEach((docSnap) => {
          const data = docSnap.data()
          tasks.push({
            id: docSnap.id,
            task: data.task,
            dueDate: data.dueDate,
            category: data.category,
            note: data.note,
            done: data.done,
          })
        })
        this.tasks = tasks
      },
      (error) => {
        console.error('Firestore error:', error)
      })
    },
    async doneTask(payload: any) {
      if (!payload.done) {
        const ref = doc(db, 'tasks', payload.id)
        try {
          await updateDoc(ref, { done: true })
          console.log('Task done')
        } catch (err) {
          console.error(err)
        }
      }
    },
    async notDoneTask(payload: any) {
      if (payload.done) {
        const ref = doc(db, 'tasks', payload.id)
        try {
          await updateDoc(ref, { done: false })
          console.log('Task not done')
        } catch (err) {
          console.error(err)
        }
      }
    },
    async deleteTask(payload: any) {
      const ref = doc(db, 'tasks', payload.id)
      try {
        await deleteDoc(ref)
        console.log('Task deleted')
      } catch (err) {
        console.error(err)
      }
    },
  },
})
