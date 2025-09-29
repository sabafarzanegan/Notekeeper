"use strict";

const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

const greetingMsg = (currentHour) => {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";

  return `Good ${greeting}`;
};

let lastActiveNavItem;
const activeNooteBook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active");
  lastActiveNavItem = this;
};

const makeEleEditable = (elenemt) => {
  elenemt.setAttribute("contenteditable", true);
  elenemt.focus();
};
function findNoteBook(noteKeeperDB, id) {
  return noteKeeperDB.notebooks.find((ele) => ele.id === id);
}

export {
  addEventOnElements,
  greetingMsg,
  activeNooteBook,
  makeEleEditable,
  findNoteBook,
};
