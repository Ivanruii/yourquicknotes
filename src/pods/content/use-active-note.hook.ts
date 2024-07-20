import { useEffect, useState, useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { NoteModel, useNotesContext } from "@/core/providers/";

export const useActiveNote = () => {
  const { notes, activeNoteId, setNoteContent } = useNotesContext();
  const [activeNote, setActiveNote] = useState<NoteModel | null>(null);
  const editorRef = useRef<MDXEditorMethods | null>(null);

  useEffect(() => {
    const note = notes.find((note) => note.id === activeNoteId);
    if (note) {
      setActiveNote(note);
      if (editorRef.current) {
        editorRef.current.setMarkdown(note.content);
      }
    } else {
      setActiveNote(null);
      if (editorRef.current) {
        editorRef.current.setMarkdown("");
      }
    }
  }, [activeNoteId, notes]);

  const handleEditorChange = (newContent: string) => {
    if (activeNoteId) {
      setNoteContent(activeNoteId, newContent);
    }
  };

  return { activeNote, editorRef, handleEditorChange };
};
