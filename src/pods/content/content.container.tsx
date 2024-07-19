import { useEffect, useRef, useState } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  BoldItalicUnderlineToggles,
  UndoRedo,
  toolbarPlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useNotesContext } from "@/core/providers/notes/notes.provider";
import { NoteModel } from "@/core/providers/notes/notes.model";

export const Content = () => {
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

  return (
    <div className="w-3/4 p-4">
      {activeNote ? (
        <MDXEditor
          ref={editorRef}
          markdown={activeNote.content}
          onChange={handleEditorChange}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                </>
              ),
            }),
          ]}
        />
      ) : (
        <p>No note selected</p>
      )}
    </div>
  );
};
