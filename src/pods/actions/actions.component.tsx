import { useNotesContext } from "@/core/providers/";

export const Actions = () => {
  const { addNote } = useNotesContext();

  return (
    <div>
      <button
        onClick={addNote}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Crear Nota
      </button>
    </div>
  );
};
