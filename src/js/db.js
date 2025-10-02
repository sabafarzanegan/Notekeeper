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

      const index = noteKeeperDB.notebooks.findIndex(
        (item) => item.id === notebookId
      );

      if (index !== -1) {
        noteKeeperDB.notebooks.splice(index, 1);
      }

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

      findNotes.notes = [...findNotes.notes, newNote];
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

      if (!findNotebooks) return;

      const noteIndex = findNotebooks.notes.findIndex(
        (item) => item.title === noteName
      );

      if (noteIndex !== -1) {
        findNotebooks.notes.splice(noteIndex, 1);
      }

      writesDb();
      return findNotebooks.notes;
    },
  },
};
