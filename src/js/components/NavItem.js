/**
 * @copyright codewithsadee 2023
 */

"use strict";

export const navItem = function (name, id) {
  console.log("navItemname", name);

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
  return navItem;
};
