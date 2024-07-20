export interface NoteModel {
  id: string;
  name: string;
  content: string;
}

export const createInitialNote = (): NoteModel => ({
  id: crypto.randomUUID(),
  name: "Nota vacia",
  content: "Nota sin contenido.",
});

export interface NotesContextModel {
  notes: NoteModel[];
  setNoteName: (id: string, name: string) => void;
  setNoteContent: (id: string, content: string) => void;
  addNote: () => void;
  deleteNote: (id: string) => void;
  activeNoteId: string | null;
  setActiveNoteId: (id: string) => void;
  saveNotes: () => void;
  loadNotes: () => void;
}
