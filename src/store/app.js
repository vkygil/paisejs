// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      book: [
        {
          name: "Vikt",
          total: 22,
          transactions: [
            {
              id: "asdfwegjhfk",
              amount: 5,
              type: "lend",
              date: "2022-10-25",
              message: "message 1",
            },
            {
              id: "assg3rafwex",
              amount: 2,
              type: "borrow",
              date: "2022-09-25",
            },
          ],
        },
        {
          name: "Omkar",
          total: 22,
          transactions: [
            {
              id: "assg3rafwex",
              amount: 2,
              type: "borrow",
              date: "2022-09-25",
            },
          ],
        },
        {
          name: "RIPPY",
          total: 22,
          transactions: [
            {
              id: "asdfwegjhfk",
              amount: 5,
              type: "lend",
              date: "2022-10-25",
              message: "message 1",
            },
          ],
        },
      ],

    }
  },
  getters: {
    person: (state) => {
      return (name) => state.book.find((t) => t.name === name)
    },
  },
})
