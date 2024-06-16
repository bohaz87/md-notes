import * as uuid from "uuid";
import NoteStorage from "./storage";

export default class NoteLocalStorage extends NoteStorage {
  addNote(note: Note) {
    const notes = this.getNotes();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  saveNote(id: string, content: string) {
    const notes = this.getNotes();
    let match = notes.find((n) => n.id === id);
    if (!match) {
      throw new Error("could note find note to save");
    }
    match.content = content;

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  getNotes() {
    const notes = localStorage.getItem("notes") || "[]";
    return JSON.parse(notes) as Note[];
  }

  getFolders() {
    const folders = JSON.parse(
      localStorage.getItem("folders") || "[]"
    ) as M_NoteFolder[];
    folders.unshift({
      id: this.name + "0",
      name: this.name + "全部",
      storageId: this.name,
      total: folders.reduce((sum, f) => {
        sum += f.total;
        return sum;
      }, 0),
    });
    return folders;
  }

  addFolder(name: string) {
    const folders = this.getFolders();
    const newFolder: M_NoteFolder = {
      id: uuid.v4(),
      name,
      storageId: this.name,
      total: 0,
    };
    folders.push(newFolder);
    folders.shift();
    localStorage.setItem("folders", JSON.stringify(folders));
    return newFolder;
  }

  getNotesByFolder(folderId: string) {
    return this.getNotes().filter((n) => n.folderId === folderId);
  }
}
