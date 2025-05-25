const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`);
  };
  this.toggleRead = function (value) {
    this.read = value;
  };
}


export function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}




// console.log(myLibrary);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Strangers in Time", "David Baldacci", 395, false);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 500, true);
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K. Rowling", 900, false);
addBookToLibrary("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 100, false);
addBookToLibrary("Harry Potter and the Goblet of Fire", "J.K. Rowling", 900, false);
addBookToLibrary("Harry Potter and the Order of the Phoenix", "J.K. Rowling", 500, false);
addBookToLibrary("Harry Potter and the Half-Blood Prince", "J.K. Rowling", 250, true);
addBookToLibrary("Harry Potter and the Deathly Hallows", "J.K. Rowling", 400, true);
addBookToLibrary("Jenney's Second Year Latin", "Charles Jenney Jr.", 300, false);
addBookToLibrary("The Physical Setting", "Landa & Kiefer", 400, false);
addBookToLibrary("Moby Dick", "Herman Melville", 200, false);
addBookToLibrary("Go Set A Watchman", "Harper Lee", 100, true);
addBookToLibrary("To Kill A Mockingbird", " Harper Lee", 800, true);
addBookToLibrary("Mythology", " Edith Hamilton", 140, true);
addBookToLibrary("Animal Farm", "George Orwell", 200, false);
addBookToLibrary("American History: A Survey", " Brinkley", 700, false);





export function renderBooks(bookList) {
  // console.log(bookList);

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
        // console.log(id);
        myLibrary.filter((book) => {
          if (book.id === id) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            renderBooks(bookList);
          }
        });
      });
      buttonsContainer.appendChild(deleteButton);
      bookCard.appendChild(buttonsContainer);
      // Append the book card to the book list

      bookList.appendChild(bookCard);
    });
}