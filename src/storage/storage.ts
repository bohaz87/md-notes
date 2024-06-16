export default abstract class NoteStorage {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract getNotes(): Note[];

  abstract getNotesByFolder(folderId: string): Note[];

  abstract addNote(note: Note): void;
  abstract saveNote(id: string, content: string): void;

  abstract getFolders(): M_NoteFolder[];

  abstract addFolder(name: string): M_NoteFolder;
}
