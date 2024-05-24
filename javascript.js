const books = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    this.info = () => {
        let readString;
        if(this.read) 
            readString = "is read";
        else 
            readString = "isn't read";
        return `${this.title} made by ${this.author} has ${this.pages} pages and ${readString}`
    }

    this.toggleStatus = () => {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    books.push(newBook);
}

function createCards() {

    const cards = [];

    books.forEach(book => {
        const headingTitle = document.createElement('div');
        headingTitle.classList.add("title-header");
        headingTitle.textContent = `${book.title}`;

        const card = document.createElement('div');
        card.classList.add("book-card");
        card.setAttribute("data-index", books.length);

        card.appendChild(headingTitle);
        const values = Object.keys(book);
        values.forEach(property => {
            if(book[property] instanceof Function) {
                return;
            }
            const propertyValue = document.createElement('div');
            propertyValue.classList.add("property-value");
            propertyValue.textContent = `${property}: ${book[property]}`;
            card.appendChild(propertyValue);
        });

        cards.push(card);
    })

    return cards;

}

function createCard(book) {

    const headingTitle = document.createElement('div');
    headingTitle.classList.add("title-header");
    headingTitle.textContent = `${book.title}`;

    const card = document.createElement('div');
    card.classList.add("book-card");
    card.setAttribute("data-index", books.indexOf(book));

    card.appendChild(headingTitle);
    const values = Object.keys(book);

    values.forEach(property => {
        if(book[property] instanceof Function || property == "title") {
            return;
        }
        const propertyValue = document.createElement('div');
        propertyValue.classList.add("property-value");
        propertyValue.textContent = `${property}: ${book[property]}`;
        
        if(property == "read") {
            propertyValue.classList.add("read");
            propertyValue.addEventListener("click", () => {
                let index = card.getAttribute("data-index")
                let book = books[index];
                book.toggleStatus();
                propertyValue.textContent = `${property}: ${book[property]}`
            })
        }

        card.appendChild(propertyValue);
    })

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", (e) => {
        let card = e.target.parentElement;
        let index = card.getAttribute("data-index");
        let book = removeBook(index);
        console.log("book deleted " + book[0].title);
        card.parentElement.removeChild(card);
    })

    card.appendChild(removeButton);

    return card;
}

function removeBook(index) {
    return books.splice(index, 1);
}

function displayBooks() {

    const grid = document.querySelector(".card-container");

    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    books.forEach(book => {
        let card = createCard(book);
        grid.appendChild(card);
    })
}

const showButton = document.querySelector(".open-dialog");
const dialog = document.querySelector("#book-dialog");
const closeButton = document.querySelector(".cancel-button");
const confirmButton = document.querySelector(".confirm-button");

showButton.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pageCount = document.getElementById("page-count");
    const read = document.getElementsByName("read");
    let readResult = false;
    read.forEach(node => {
        if(!node.checked) {
            return;
        }

        let idName = node.id;
        if(idName == "yes")
            readResult = true;
    })

    addBookToLibrary(title.value, author.value, pageCount.value, readResult);
    displayBooks();
    dialog.close();
})

addBookToLibrary("Harry Potter", "J.K Rowling", 350, 1);
addBookToLibrary("Atomic Habits", "James Clear", 300, 1);
displayBooks();

