"use strict";
// import modules
import {
  addEventOnElements,
  greetingMsg,
  activeNooteBook,
  makeEleEditable,
} from "./utils.js";
import { db } from "./db.js";
import { client } from "./client.js";

// toggle sidebar

const $sidebar = document.querySelector("[data-sidebar]");
const $sidebar_toggler = document.querySelectorAll("[data-sidebar-toggler]");
const $overlay = document.querySelector("[data-sidebar-overlay]");
const noteCreateBtn = document.querySelectorAll("[data-note-create-btn]");

addEventOnElements($sidebar_toggler, "click", () => {
  $sidebar.classList.toggle("active");
  $overlay.classList.toggle("active");
});

// handler time greeting
const greetingEle = document.querySelector("[data-greeting]");
const currentHoure = new Date().getHours();
greetingEle.textContent = greetingMsg(currentHoure);

// show current date on homepage
const currentDataEle = document.querySelector("[data-current-date]");
currentDataEle.textContent = new Date().toDateString();

// notebook create field
let database = db.get.notebook();
console.log("database", database);

if (database.length == 0) {
  noteCreateBtn.forEach((item) => item.classList.add("none"));
} else {
  noteCreateBtn.forEach((item) => item.classList.add("display"));
}
const sidebar_list = document.querySelector("[data-sidebar-list]");
const addNotebookBtn = document.querySelector("[data-add-notebook]");
function showNotebookField() {
  console.log("show notebook field");
  const $navItem = document.createElement("div");
  $navItem.classList.add("nav-item");

  $navItem.innerHTML = `
       <span class="text text-label-small" data-notebook-field>
          </span>
          <button
            class="icon-btn small"
            aria-label="edit notebook"
            data-tooltip="edit notebook"
            data-edit-btn>
            <span class="material-symbols-rounded" aria-hidden="true"
              >edit</span
            >
            <div class="state-layer"></div>
          </button>
          <button
            class="icon-btn small"
            aria-label="delete notebook"
            data-tooltip="delete notebook"
            data-delete-btn>
            <span class="material-symbols-rounded" aria-hidden="true"
              >delete</span
            >
            <div class="state-layer"></div>
          </button>
          <div class="state-layer"></div>
  `;
  // const $navItem = navItem();
  sidebar_list.appendChild($navItem);

  const navItemField = $navItem.querySelector("[data-notebook-field]");
  activeNooteBook.call($navItem);
  makeEleEditable(navItemField);
  navItemField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log(e.key);
      const notebookDate = db.post.notebook(
        navItemField.textContent || "Untitled"
      );
      navItemField.parentElement.remove();
      client.notebook.create(notebookDate);
    }
  });
  noteCreateBtn.forEach((item) => item.classList.add("display"));
}
addNotebookBtn.addEventListener("click", showNotebookField);

function renderExistingNotebook() {
  const notebookList = db.get.notebook();

  client.notebook.read(notebookList);
}
renderExistingNotebook();

// create note
const submitmodal = document.querySelector("[data-submit-modal]");

noteCreateBtn?.forEach((btn) => {
  btn.addEventListener("click", function () {
    submitmodal.showModal();

    // دکمه کنسل
    const cancelBtn = submitmodal.querySelector("[data-cancel-submit-modal]");
    cancelBtn.onclick = () => submitmodal.close();

    const textModal = submitmodal.querySelector("[data-note-field]");
    const textAreaModal = submitmodal.querySelector("[data-note-textarea]");

    let newTitleModal = "";
    let newTextAreaModal = "";

    textModal.addEventListener("input", (e) => {
      newTitleModal = e.target.value;
      console.log("Title:", newTitleModal);
    });

    textAreaModal.addEventListener("input", (e) => {
      newTextAreaModal = e.target.value;
      console.log("Text:", newTextAreaModal);
    });

    const modalSubmitBtn = submitmodal.querySelector("[data-submit-btn]");
    modalSubmitBtn.addEventListener(
      "click",
      function () {
        const notePanelTitle = document.querySelector(
          "[data-note-panel-title]"
        );
        const newNote = db.notes.create(
          notePanelTitle.innerText,
          newTitleModal,
          newTextAreaModal
        );
        client.notes.create(newNote.title, newNote.text);

        submitmodal.close();
        textModal.value = "";
        textAreaModal.value = "";
      },
      { once: true }
    );
  });
});

function renderExistingNotes() {
  const activeNoteBookeId = document.querySelector("[data-notebook].active")
    ?.dataset.notebook;
  if (activeNoteBookeId) {
    const noteLists = db.notes.get(activeNoteBookeId);

    client.notes.read(noteLists);
  }
}
renderExistingNotes();
