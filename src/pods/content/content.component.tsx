import { useActiveNote } from "./use-active-note.hook";
import { NoteEditor } from "./components";

export const Content = () => {
  const { activeNotes, editorRef, handleEditorChange } = useActiveNote();

  const activeNote = activeNotes.find((note) => note.display)?.note;

  return (
    <div className="text-white">
      {activeNote ? (
        <NoteEditor
          ref={editorRef}
          markdown={activeNote.content}
          onChange={handleEditorChange}
        />
      ) : (
        <p>No note selected</p>
      )}
    </div>
  );
};
