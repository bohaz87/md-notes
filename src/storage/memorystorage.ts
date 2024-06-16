import * as uuid from "uuid";
import NoteStorage from "./storage";

export default class NoteLocalStorage extends NoteStorage {
  folders: M_NoteFolder[] = [];
  notes: Note[] = [];

  saveNote(id: string, content: string) {
    const match = this.notes.find((n) => n.id === id);
    if (!match) {
      throw new Error("could note find note to save");
    }
    match.content = content;
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  getNotes() {
    return this.notes;
  }

  getFolders() {
    if (this.folders[0]?.id !== this.name + "0") {
      this.folders.unshift({
        id: this.name + "0",
        name: this.name + "全部",
        storageId: this.name,
        total: this.notes.length,
      });
    }
    return this.folders;
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
    return newFolder;
  }

  getNotesByFolder(folderId: string) {
    return this.getNotes().filter((n) => n.folderId === folderId);
  }
}
