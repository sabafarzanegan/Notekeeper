/**
 * @copyright codewithsadee 2023
 */

"use strict";

import { db } from "../db.js";
import { activeNooteBook, makeEleEditable } from "../utils.js";

export const navItem = function (name, id) {
  const notePanelTitle = document.querySelector("[data-note-panel-title]");

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
      const updatednavitem = db.update.notebook(this.textContent, id);
    }
  });
  return navItem;
};
