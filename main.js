"use strict";
const books = [];
// ---------------------------------------------------
//                    add new book
// ---------------------------------------------------
const form = document.querySelector("form");
const inputTitle = {
  content: document.querySelector("#title"),
  error: document.querySelector("#seccion-title>span"),
};
const inputAuthor = {
  content: document.querySelector("#author"),
  error: document.querySelector("#seccion-author>span"),
};
const inputPages = {
  content: document.querySelector("#pages"),
  error: document.querySelector("#seccion-pages>span"),
};
const buttonSave = document.querySelector("#save");
const buttonCancel = document.querySelector("#cancel");

// function constructor
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

function isValidInput() {
  const isTitleValid = !!inputTitle.content.value; // !undefined === true
  const isAuthorValid = !!inputAuthor.content.value; // intputAuthor.content.value !== undefined
  const isInputPagesValid = !!inputPages.content.value;

  inputTitle.error.style.visibility = isTitleValid ? "hidden" : "visible";
  inputAuthor.error.style.visibility = isAuthorValid ? "hidden" : "visible";
  inputPages.error.style.visibility = isInputPagesValid ? "hidden" : "visible";

  return isTitleValid && isAuthorValid && isInputPagesValid;
}

function storeBook() {
  if (!isValidInput()) return;
  books.push({
    title: inputTitle.content.value,
    author: inputAuthor.content.value,
    pages: inputPages.content.value,
    isRead: false,
  });
  form.style.visibility = "hidden";
  form.reset();
  renderTable();
}

function closeFormulary() {
  form.style.visibility = "hidden";
  form.reset();
}

// ---------------------------------------------------
//                add new book - end
// ---------------------------------------------------

const tableBody = document.querySelector("table>tbody");
const tableButton = document.querySelector("#btn-new-book");
function addBook() {
  form.style.visibility = "visible";
}

function renderTable() {
  tableBody.innerHTML = "";
  books.forEach((book, index) => {
    const row = document.createElement("tr");
    row.setAttribute("id", `row${index}`);
    for (const key of Object.keys(book)) {
      const tableData = document.createElement("td");
      if (key === "isRead") {
        const radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.checked = book[key];
        tableData.appendChild(radio);
      } else {
        tableData.textContent = book[key];
      }
      row.appendChild(tableData);
    }

    const tableData2 = document.createElement("td");
    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Del";
    buttonDelete.setAttribute("class", "del-button");
    tableData2.appendChild(buttonDelete);
    row.appendChild(tableData2);

    tableBody.appendChild(row);
  });
}

function callbackTbody(e) {
  const idStr = e.target.parentElement.parentElement.id;
  const id = Number(idStr.replace("row", ""));
  // radio input
  if (e.target.type === "radio") {
    const idStr = e.target.parentElement.parentElement.id;
    const id = Number(idStr.replace("row", ""));
    books[id].isRead = !books[id].isRead;
    document.querySelector(`#${idStr}>td>input`).checked = books[id].isRead;
  }

  // del button
  if (e.target.getAttribute("class") === "del-button") {
    books.splice(id, 1);
    renderTable();
  }
}

function main() {
  renderTable();
  tableBody.addEventListener("click", (e) => callbackTbody(e));
  tableButton.addEventListener("click", addBook);
  buttonSave.addEventListener("click", storeBook);
  buttonCancel.addEventListener("click", closeFormulary);
  form.addEventListener("change", isValidInput);
}

main();
