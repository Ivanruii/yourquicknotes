import { useNotesContext } from "@/core/providers/notes/notes.provider";

export const Aside = () => {
  const { notes, setActiveNoteId } = useNotesContext();

  return (
    <aside className="p-4 bg-gray-100">
      {notes.map((note) => (
        <button
          key={note.id}
          onClick={() => setActiveNoteId(note.id)}
          className="block w-full p-2 mb-2 text-left text-white bg-blue-500 rounded"
        >
          {note.name}
        </button>
      ))}
    </aside>
  );
};
