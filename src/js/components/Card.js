/**
 * @copyright codewithsadee 2023
 */

"use strict";

import { client } from "../client.js";
import { db } from "../db.js";

export const Card = function (cardTitle, cardText) {
  const $cardItem = document.createElement("div");
  $cardItem.classList.add("card");
  $cardItem.innerHTML = ` <h3 class="card-title text-title-medium">
      ${cardTitle}
    </h3>
    <p class="card-text text-body-large">${cardText}</p>
    <div class="wrapper">
      <button
        class="icon-btn large"
        aria-label="Delete note"
        data-tooltip="delete note"
        data-delete-note
        >
        <span class="material-symbols-rounded" aria-hidden="true">delete</span>
      </button>
    </div>`;
  const deleteBtn = $cardItem.querySelector("[data-delete-note]");
  deleteBtn.addEventListener("click", function (e) {
    e.stopImmediatePropagation();
    const activeNoteBookeId = document.querySelector("[data-notebook].active")
      ?.dataset.notebook;
    const data = db.notes.delete(activeNoteBookeId, cardTitle);
    client.notes.read(data);
  });
  return $cardItem;
};
