import { useNotesContext } from "@/core/providers/notes/notes.provider";

export const Actions = () => {
  const { addNote } = useNotesContext();

  return (
    <div>
      <button
        onClick={addNote}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crear Nota
      </button>
    </div>
  );
};
