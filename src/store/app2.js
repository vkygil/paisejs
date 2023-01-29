import { defineStore } from 'pinia'
import { ref, reactive, watch, computed, watchEffect, onMounted } from "vue";

export const useBookStore = defineStore('book', () => {
  //refs
  const count = ref(0)
  const book = reactive([])
  const bookx = reactive([
    {
      name: "Vckyt",
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
      name: "Gill",
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
      name: "singh",
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

  onMounted(() => {
    let localStorageData = getLS()
    Object.assign(book, localStorageData?.book || [])
  })

  //actions
  const addPerson = () => {
    let person = prompt("Please enter the person's name", "Singh");
    if (person != null) {
      book.push({
        name: person, total: 0, transactions: []
      })
    }
  }

  const getLS = () => {
    return JSON.parse(localStorage.getItem("paisejs"))
  }

  //funcions
  function saveBook() {
    let tosave = {
      data: "ok",
      book: book
    }
    localStorage.setItem("paisejs", JSON.stringify(tosave))
  }

  //autosave
  let uploadTimeout;
  watch(book, (newVal) => {
    clearTimeout(uploadTimeout);
    uploadTimeout = setTimeout(() => {
      console.log("save_data()");
      saveBook()
    }, 777);
  }, { deep: true });


  return { book, addPerson, saveBook }
})