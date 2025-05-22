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




console.log(myLibrary);

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



export {
  myLibrary
};




