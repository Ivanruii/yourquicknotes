import { useNotesContext } from "@/core/providers/notes/notes.provider";

export const Aside = () => {
  const { notes, setActiveNoteId } = useNotesContext();

  return (
    <aside className="bg-gray-100 p-4">
      {notes.map((note) => (
        <button
          key={note.id}
          onClick={() => setActiveNoteId(note.id)}
          className="block w-full text-left p-2 mb-2 bg-blue-500 text-white rounded"
        >
          {note.name}
        </button>
      ))}
    </aside>
  );
};
