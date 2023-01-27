// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      book: [],

    }
  },
  getters: {
    person: (state) => {
      return (name) => state.book.find((t) => t.name === name)
    },
  },
})
