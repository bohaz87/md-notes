import { action, makeAutoObservable, observable } from "mobx";
import uiStore from "./uiStore";
import NoteStorage from "../storage/storage";
import { getStorage } from "../storage";

export class FolderStore {
  @observable
  groups: NoteFolderGroup[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action loadFromStorage(storages: NoteStorage[]) {
    this.groups.push(
      ...storages.map((s) => {
        return { name: s.name, storageId: s.name, folders: s.getFolders() };
      })
    );
  }

  @action
  addNew(name: string) {
    const newFolder = getStorage(uiStore.storageId).addFolder(name);
    const g = this.groups.find((g) => g.storageId === uiStore.storageId);
    if (!g) {
      throw new Error(`could not find folder group: ${uiStore.storageId}`);
    }
    g.folders.push(newFolder);
    // uiStore.selectFolder(newFolder);
  }
}

const folderStore = new FolderStore();
export default folderStore;
