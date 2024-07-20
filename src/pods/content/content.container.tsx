import { useActiveNote } from "./use-active-note.hook";
import { NoteEditor } from "./components/note-editor.component";

export const Content = () => {
  const { activeNote, editorRef, handleEditorChange } = useActiveNote();

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
