/**
 * @copyright codewithsadee 2023
 */

"use strict";

import { navItem } from "./components/NavItem.js";
import { activeNooteBook } from "./utils.js";
const dataSidbarList = document.querySelector("[data-sidebar-list]");
const notePanelTitle = document.querySelector("[data-note-panel-title]");
export const client = {
  notebook: {
    create(notebookData) {
      console.log("notebookData", notebookData);

      const $navItem = navItem(notebookData.name, notebookData.id);
      dataSidbarList.appendChild($navItem);
      activeNooteBook.call($navItem);
      notePanelTitle.textContent = notebookData.name;
    },
    read(notebookList) {
      notebookList.forEach((element, index) => {
        const $navItem = navItem(element.name, element.id);
        if (index === 0) {
          activeNooteBook.call($navItem);
          notePanelTitle.textContent = element.name;
        }
        dataSidbarList.appendChild($navItem);
      });
    },
    update(notebookId, notebookData) {
      console.log(notebookData);

      const oldNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      );
      const newNotebook = navItem(notebookData.name, notebookData.id);
      notePanelTitle.textContent = notebookData.name;
      dataSidbarList.replaceChild(newNotebook, oldNotebook);
      activeNooteBook.call(newNotebook);
    },
    delete(notebookId) {
      const deletedNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      );
      const activeNavItem =
        deletedNotebook.nextElementSibling ??
        deletedNotebook.previousElementSibling;
      if (activeNavItem) {
        activeNavItem.click();
      }
      deletedNotebook.remove();
    },
  },
};
