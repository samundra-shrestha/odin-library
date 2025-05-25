import "./style.css";
import { renderBooks, addBookToLibrary } from "./book.js";

document.querySelector("#app").innerHTML = /*html*/ `   
<div class="bg-blue-300 w-full h-[100vh] flex relative">
  <aside class="w-[300px] bg-amber-900 h-full shrink-0 flex justify-center items-center ">
<button id="show" class="bg-[#fff] text-amber-900 px-4 py-2 rounded-lg hover:bg-amber-900 hover:text-white border-2 transition-all duration-300 cursor-pointer m-4">
Add Book
</button>
  </aside>
  <main class="w-full h-full overflow-auto">    
    <div class="grid grid-cols-3 p-6 gap-4" id="book-list">

    </div>
  </main>
    <dialog class=" w-full h-full absolute top-0 left-0 bg-[#00000080] max-w-[100%] max-h-[100%]">
  
 <div class="bg-white w-[400px] rounded-lg shadow-lg relative left-[50%] top-[50%] -translate-[50%] p-6">
 <button class="aspect-[1] w-[30px] rounded-[50%] bg-[#fff] right-0 absolute top-0 translate-x-[50%] -translate-y-[50%] cursor-pointer hover:bg-amber-700 hover:text-amber-50 transition-all" id="close">X</button>
  <form action="" class="flex flex-col gap-4">
    <input type="text" placeholder="Book Name"  class="p-3 outline-1" id="bookName"/>
    <input type="text" placeholder="Author Name"  class="p-3 outline-1" id="authorName"/>
    <input type="number" placeholder="Page Number"  class="p-3 outline-1" id="pageNumber"/>
    <select name="" id="readValue" class="p-3 outline-1">
    <option value="true">Read</option>
    <option value="false">Not Read</option>
    </select>
    <input type="button" id="submitBtn" value="Add" class="p-3 outline-1 cursor-pointer hover:bg-amber-800 transition-all hover:text-amber-50"/>
  </form>
 </div>
</dialog>

</div>
 
  `;

const bookList = document.querySelector("#book-list");

renderBooks(bookList);

const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const pageNumber = document.getElementById("pageNumber");
const readValue = document.getElementById("readValue");
const submitBtn = document.getElementById("submitBtn");
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("show");
const closeButton = document.getElementById("close");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  clearForm();
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    clearForm();
  }
});

function clearForm() {
  bookName.value = "";
  authorName.value = "";
  pageNumber.value = "";
  readValue.value = "true";
}

submitBtn.addEventListener("click", () => {
  const title = bookName.value;
  const author = authorName.value;
  const pages = pageNumber.value;
  const read = readValue.value === "true";
  // console.log(title, author, pages, read);
  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    renderBooks(bookList);
    dialog.close();
    clearForm();
  } else {
    alert("Please fill all the fields");
  }
});
