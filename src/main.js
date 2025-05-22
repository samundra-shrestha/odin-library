import "./style.css";
import { myLibrary, addBookToLibrary } from "./book.js";

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
// console.log(bookList);
function renderBooks() {
  console.log(myLibrary);

  bookList.innerHTML = "";
  myLibrary
    .slice()
    .reverse()
    .forEach((book) => {
      // card Body
      const bookCard = document.createElement("div");
      bookCard.setAttribute("data-id", book.id);
      bookCard.classList.add(
        "bg-[#fff]",
        "p-7",
        "flex",
        "flex-col",
        "gap-4",
        "rounded-lg",
        "shadow-md",
        "cursor-pointer",
        "hover:-translate-y-1",
        "hover:shadow-lg",
        "transition-all",
        "duration-300"
      );

      // Book Title
      const bookTitle = document.createElement("h2");
      bookTitle.classList.add("text-2xl", "font-bold");
      bookTitle.innerText = "Book Title: " + book.title;
      bookCard.appendChild(bookTitle);

      // Book Author
      const author = document.createElement("h3");
      author.classList.add("text-xl", "font-bold");
      author.innerText = "Author: " + book.author;
      bookCard.appendChild(author);

      // book Pages
      const pagesContainer = document.createElement("div");
      pagesContainer.classList.add("flex", "justify-between");
      const pages = document.createElement("h4");
      pages.innerText = "Pages: " + book.pages;
      pagesContainer.appendChild(pages);

      // book Read
      const toggleRead = document.createElement("div");
      toggleRead.classList.add("flex", "gap-2", "items-center");
      const checkboxLabel = document.createElement("label");
      checkboxLabel.classList.add(
        "cursor-pointer",
        "relative",
        "inline-block",
        "w-14",
        "h-8"
      );

      const span = document.createElement("span");
      span.classList.add(
        "absolute",
        "cursor-pointer",
        "top-0",
        "left-0",
        "right-0",
        "bottom-0",
        "bg-gray-300",
        "rounded-full",
        "transition-colors",
        "duration-300",
        "peer-checked:bg-blue-500"
      );

      const span2 = document.createElement("span");
      span2.classList.add(
        "absolute",
        "left-1",
        "top-1",
        "bg-white",
        "w-6",
        "h-6",
        "rounded-full",
        "transition-transform",
        "duration-300",
        "peer-checked:translate-x-6"
      );

      const span3 = document.createElement("span");
      span3.classList.add("text-gray-700");
      span3.innerText = book.read ? "Read" : "Not Read";
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("sr-only", "peer");
      checkbox.checked = book.read;
      checkbox.addEventListener("change", (e) => {
        const bookId = e.target.closest("[data-id]");
        const id = bookId?.dataset.id;
        myLibrary.filter((book) => {
          if (book.id === id) {
            book.toggleRead(e.target.checked);
            span3.innerText = book.read ? "Read" : "Not Read";
          }
        });
      });
      toggleRead.appendChild(span3);
      toggleRead.appendChild(checkboxLabel);
      checkboxLabel.appendChild(checkbox);
      checkboxLabel.appendChild(span);
      checkboxLabel.appendChild(span2);

      pagesContainer.appendChild(toggleRead);
      bookCard.appendChild(pagesContainer);

      // buttons Holder
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add(
        "flex",
        "justify-between",
        "mt-2.5",
        "items-center"
      );
      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "bg-red-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded-lg",
        "hover:bg-red-600",
        "transition-all",
        "duration-300",
        "cursor-pointer"
      );
     
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", (e) => {
        const bookId = e.target.closest("[data-id]");
        const id = bookId?.dataset.id;
        myLibrary.filter((book) => {
          if (book.id === id) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            renderBooks();
          }
        });
      });
      buttonsContainer.appendChild(deleteButton);
      bookCard.appendChild(buttonsContainer);
      // Append the book card to the book list

      bookList.appendChild(bookCard);
    });
}

renderBooks();

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
  const read = readValue.value === "true" ? true : false;
  console.log(title, author, pages, read);
  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    renderBooks();
    dialog.close();
    clearForm();
  } else {
    alert("Please fill all the fields");
  }
});
