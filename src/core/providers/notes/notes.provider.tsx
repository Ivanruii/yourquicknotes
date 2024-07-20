import { useState, useEffect, useContext } from "react";
import { NotesContext } from "./notes.context";
import { createInitialNote, NoteModel } from "./notes.model";

interface Props {
  children: React.ReactNode;
}

export const NotesProvider = (props: Props) => {
  const { children } = props;
  const [notes, setNotes] = useState<NoteModel[]>([createInitialNote()]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const setNoteName = (id: string, name: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, name } : note))
    );
  };

  const setNoteContent = (id: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);
      if (activeNoteId === id && updatedNotes.length > 0) {
        setActiveNoteId(updatedNotes[0].id);
      } else if (updatedNotes.length === 0) {
        setActiveNoteId("");
      }
      return updatedNotes;
    });
  };

  const addNote = () => {
    const newNote = createInitialNote();
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setActiveNoteId(newNote.id);
  };

  const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const loadNotes = () => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNoteName,
        setNoteContent,
        deleteNote,
        addNote,
        activeNoteId,
        setActiveNoteId,
        saveNotes,
        loadNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (context === null) {
    throw new Error(
      "useNotesContext: looks like you have forgotten to add the provider on top of the app :)"
    );
  }

  return context;
};
