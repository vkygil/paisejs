import { defineStore } from "pinia";
import { reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

export const useBookStore = defineStore("book", () => {
  const router = useRouter();
  //refs
  const book = reactive([]);
  const appPreference = reactive([]);

  onMounted(() => {
    let localStorageData = JSON.parse(localStorage.getItem("paisejs")); // getLS()
    let localStorageData2 = JSON.parse(localStorage.getItem("paisejs_pref")); // getLS()

    Object.assign(book, localStorageData?.book || []);
    Object.assign(appPreference, localStorageData2 || { language: "en" });
    console.log("d");
  });

  //actions
  const addPerson = (person) => {
    if (person == null) return;
    if (book.find((p) => p.name == person.name)) return;

    book.push({
      name: person.name,
      tel: person.tel,
      total: 0,
      transactions: [],
    });
    // router.push(`/person/${person.name}`)
  };
  const addPersonOld = () => {
    let person = prompt("Please enter the person's name", "");
    if (person != null) {
      book.push({
        name: person,
        total: 0,
        transactions: [],
      });
      router.push(`/person/${person}`);
    }
  };

  //funcions
  function saveBook() {
    let tosave = {
      book: book
    };
    localStorage.setItem("paisejs", JSON.stringify(tosave));
    console.log("save_data_offline()");
    if (localStorage.getItem("accessToken")) {
      fetch("https://paise.onrender.com/api/book", {
        //  fetch("http://localhost:3001/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("accessToken"), book: book }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("save_data_online()");
          console.log(data);
        });
    }

  }

  let updateBook = (bookc) => {
    Object.assign(book, bookc)
  }
  let downloadBook = () => {
    console.log("attempt to download");
    let filename = "export.json", dataObjToWrite = book
    const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
  }

  //autosave
  let uploadTimeout;
  watch(
    book,
    (newVal, oldVal) => {
      clearTimeout(uploadTimeout);
      uploadTimeout = setTimeout(() => {
        console.log({ ...oldVal });
        saveBook();
      }, 777);
    },
    { deep: true }
  );

  return { book, addPerson, saveBook, updateBook, downloadBook };
});
