/**
 * @copyright codewithsadee 2023
 */

"use strict";

import { findNoteBook } from "./utils.js";

let noteKeeperDB = {};

const initeDB = () => {
  const db = localStorage.getItem("noteKeeperDB");
  if (db) {
    noteKeeperDB = JSON.parse(db);
    console.log(noteKeeperDB);
  } else {
    noteKeeperDB.notebooks = [];
    localStorage.setItem("noteKeeperDB", JSON.stringify(noteKeeperDB));
  }
};

initeDB();

const readDb = () => {
  noteKeeperDB = JSON.parse(localStorage.getItem("noteKeeperDB"));
};

const writesDb = () => {
  localStorage.setItem("noteKeeperDB", JSON.stringify(noteKeeperDB));
};

export const db = {
  post: {
    notebook(name) {
      readDb();
      //   create new notebook
      const newNoteBooke = {
        id: Date.now().toString(),
        name,
        notes: [],
      };
      noteKeeperDB.notebooks.push(newNoteBooke);
      writesDb();
      return newNoteBooke;
    },
  },
  get: {
    notebook() {
      readDb();
      console.log(noteKeeperDB.notebooks);

      return noteKeeperDB.notebooks;
    },
  },
  update: {
    notebook(name, id) {
      readDb();
      const findNotebook = findNoteBook(noteKeeperDB, id);
      findNotebook.name = name;
      writesDb();
      return findNotebook;
    },
  },
  delete: {
    notebook(notebookId) {
      readDb();

      const findIndex = noteKeeperDB.notebooks.find(
        (item) => item.id === notebookId
      );

      noteKeeperDB.notebooks.splice(findIndex, 1);

      writesDb();
    },
  },
};
