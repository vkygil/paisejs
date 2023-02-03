import { defineStore } from 'pinia'
import { reactive, watch, onMounted } from "vue";
import { useRouter } from 'vue-router';


export const useBookStore = defineStore('book', () => {
  const router = useRouter()
  //refs 
  const book = reactive([])
  const appPreference = reactive([])

  onMounted(() => {
    let localStorageData = JSON.parse(localStorage.getItem("paisejs")) // getLS()
    let localStorageData2 = JSON.parse(localStorage.getItem("paisejs_pref")) // getLS()

    Object.assign(book, localStorageData?.book || [])
    Object.assign(appPreference, localStorageData2 || { language: "en" })
  })

  //actions
  const addPerson = () => {
    let person = prompt("Please enter the person's name", "Singh");
    if (person != null) {
      book.push({
        name: person, total: 0, transactions: []
      })
      router.push(`/person/${person}`)
    }
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