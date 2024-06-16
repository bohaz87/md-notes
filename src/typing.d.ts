interface M_NoteFolder {
  id: string;
  name: string;
  storageId: string;
  total: number;
}

interface V_NoteFolder {
  id: string;
  name: string;
  storageId: string;
  total: number;
  // notes: Note[];
}

interface NoteFolderGroup {
  name: string;
  storageId: string;
  folders: V_NoteFolder[];
}

interface NoteGroup {
  name: string;
  notes: (Note & { title: string })[];
}

interface Note {
  id: string;
  storageId: string;
  folderId: string;
  content: string;
  createDate: number;
  modifiedDate: number;
}
