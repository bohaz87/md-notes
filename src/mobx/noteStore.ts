import { action, computed, makeAutoObservable, observable } from "mobx";
import uiStore from "./uiStore";
import * as uuid from "uuid";
import NoteStorage from "../storage/storage";
import { getStorage } from "../storage";

export class NoteStore {
  @observable
  notes: Note[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action loadFromStorage(storage: NoteStorage) {
    this.notes = storage.getNotes();
  }

  @computed
  get groups(): NoteGroup[] {
    const notes = this.notes;
    const groups: NoteGroup[] = [
      {
        name: "今天",
        notes: [],
      },
      {
        name: "昨天",
        notes: [],
      },
      {
        name: "最近7天",
        notes: [],
      },
      {
        name: "过去30天",
        notes: [],
      },
      {
        name: "其他",
        notes: [],
      },
    ]; //.filter((g) => g.notes.length);
    const now = Date.now();
    notes.forEach((note) => {
      const title = note.content.split("\n")[0];
      const content = note.content.split("\n").slice(1, 10).join(" ");

      if (now - note.modifiedDate > 24 * 60 * 60 * 1000) {
        groups[0].notes.push({ ...note, title, content });
      } else {
        groups[4].notes.push({ ...note, title, content });
      }
    });
    return groups;
  }

  @action
  addNew() {
    const newNote: Note = {
      id: uuid.v4(),
      folderId: uiStore.folderId,

      storageId: uiStore.storageId,
      content: "",
      createDate: Date.now(),
      modifiedDate: Date.now(),
    };
    getStorage(uiStore.storageId).addNote(newNote);
    this.notes.push(newNote);
    uiStore.selectNote(newNote);
  }

  @action
  save(id: string, content: string) {
    const storage = getStorage(uiStore.storageId);
    storage.saveNote(id, content);
    const match = this.notes.find((n) => n.id === id);
    if (!match) {
      throw new Error("could not find note");
    }
    match.content = content;
  }
}

const noteStore = new NoteStore();
export default noteStore;
