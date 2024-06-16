import { makeAutoObservable, action } from "mobx";
import noteStore from "./noteStore";
import { getStorage } from "../storage";

export class UIStore {
  groups: NoteGroup[] = [];
  storageId: string;
  folderId: string;
  noteId: string;

  constructor() {
    this.storageId = "";
    this.folderId = "";
    this.noteId = "";
    makeAutoObservable(this);
  }

  @action
  selectNote(note: Note | null) {
    if (!note) {
      throw new Error("could not select note: null");
    }
    this.storageId = note.storageId;
    this.folderId = note.folderId;
    this.noteId = note.id;
  }

  @action
  selectFolder(folder: V_NoteFolder | null) {
    if (!folder) {
      throw new Error("could not select folder: null");
    }
    this.storageId = folder.storageId;
    this.folderId = folder.id;
    noteStore.loadFromStorage(getStorage(this.storageId));
    this.noteId = noteStore.notes[0]?.id;
  }
}

const uiStore = new UIStore();
export default uiStore;
