/**
 * @copyright codewithsadee 2023
 */

"use strict";

import { client } from "../client.js";
import { db } from "../db.js";
import { activeNooteBook, makeEleEditable } from "../utils.js";

export const navItem = function (name, id) {
  const notePanelTitle = document.querySelector("[data-note-panel-title]");
  const deletemodal = document.querySelector("[data-delete-modal]");

  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.setAttribute("data-notebook", id);
  navItem.innerHTML = `
       <span class="text text-label-small" data-notebook-field>
       ${name}
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
  navItem.addEventListener("click", function () {
    notePanelTitle.textContent = name;
    activeNooteBook.call(this);
  });

  const navItemEditBtn = navItem.querySelector("[data-edit-btn]");
  const navItemField = navItem.querySelector("[data-notebook-field]");
  navItemEditBtn.addEventListener(
    "click",
    makeEleEditable.bind(null, navItemField)
  );
  navItemField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      this.removeAttribute("contenteditable");
      // update functionallity
      const updatednavitem = db.update.notebook(this.textContent, id);
      client.notebook.update(id, updatednavitem);
    }
  });
  // delete functionality

  const navItemDeleteBtn = navItem.querySelector("[data-delete-btn]");

  navItemDeleteBtn.addEventListener("click", () => {
    deletemodal.showModal();
    const modal_delete_title = deletemodal.querySelector("#delete-modal-title");
    modal_delete_title.textContent = name;
    // cancel handler
    const cancelBtns = deletemodal.querySelectorAll(".cancel-modal");
    cancelBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        deletemodal.close();
      });
    });
    // delete handler
    const deleteBtn = deletemodal.querySelector("#delete-modal-btn");
    deleteBtn.addEventListener("click", () => {
      db.delete.notebook(id);
      client.notebook.delete(id);
      deletemodal.close();
    });
  });
  return navItem;
};
