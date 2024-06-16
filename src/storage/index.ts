import NoteLocalStorage from "./localstorage";
import NoteStorage from "./storage";
import MemoryStorage from "./memorystorage";

const storages: NoteStorage[] = [
  new NoteLocalStorage("Local Storage"),
  new MemoryStorage("Memory Storage"),
];

export const getStorage = function (name: string) {
  const storage = storages.find((s) => s.name === name);
  if (!storage) {
    throw new Error(`Could not find storage with sid: ${name}`);
  }
  return storage;
};

export default storages;
