/**
 * @copyright codewithsadee 2023
 */

"use strict";

let noteKeeperDB = {};

const initeDB = () => {
  const db = localStorage.getItem("noteKeeperDB");
  if (db) {
    noteKeeperDB = JSON.parse(db);
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
      return noteKeeperDB.notebooks;
    },
  },
};
