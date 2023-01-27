import { defineStore } from 'pinia'
import { ref, reactive, watch, watchEffect } from "vue";

export const useBookStore = defineStore('book', () => {
  const count = ref(0)
  const book = reactive([
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
          id: "3g3afwecvnjg",
          amount: 10,
          type: "lend",
          date: "2023-02-21",
          message: "message 2",
        },
        {
          id: "assg3rafwex",
          amount: 2,
          type: "borrow",
          date: "2022-09-25",
        },
        {
          id: "g3gehvcvcxe",
          amount: 3,
          type: "lend",
          date: "2023-06-05",
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
  ])
  const person = (name) => book.find((t) => t.name == name)
  const addPerson = () => {
    let person = prompt("Please enter your name", "Harry Potter");
    if (person != null) {
      book.push({
        name: person, total: 0, transactions: []
      })
    }
  }


  return { book, person, addPerson }
})