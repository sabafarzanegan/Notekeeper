"use strict";

import { findNoteBook } from "./utils.js";

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
  notes: {
    create(noteTitlePanel, noteTitle, textNote) {
      console.log(noteTitlePanel);

      readDb();
      let newNote = {
        id: Date.now().toString(),
        title: noteTitle,
        text: textNote,
      };
      const findNotes = noteKeeperDB.notebooks.find(
        (item) => item.name === noteTitlePanel
      );
      console.log(findNotes);

      findNotes.notes.push(newNote);
      writesDb();
      return newNote;
    },
    get(noteBookId) {
      console.log(noteBookId);

      readDb();
      const findnote = noteKeeperDB.notebooks.find(
        (item) => item.id === noteBookId
      );
      return findnote?.notes;
    },
    delete(activeNavItem, noteName) {
      readDb();
      const findNotebooks = noteKeeperDB.notebooks.find(
        (item) => item.id === activeNavItem
      );
      const findnote = findNotebooks.notes.find(
        (item) => item.title === noteName
      );
      console.log(findNotebooks);
      console.log(findnote);

      findNotebooks.notes.splice(findnote, 1);

      writesDb();
      return findNotebooks.notes;
    },
  },
};
