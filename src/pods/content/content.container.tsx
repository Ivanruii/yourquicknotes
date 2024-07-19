import { useNotesContext } from "@/core/providers/notes/notes.provider";

export const Content = () => {
  const { notes, activeNoteId } = useNotesContext();
  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="w-3/4 p-4">
      {activeNote ? (
        <>
          <h2 className="mb-4 text-2xl">{activeNote.name}</h2>
          <p>{activeNote.content}</p>
        </>
      ) : (
        <p>No note selected</p>
      )}
    </div>
  );
};
