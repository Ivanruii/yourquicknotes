import { useWorkspaceContext } from "@/core/providers/";

export const Actions = () => {
  const { workspaces, activeWorkspaceId, addNote } = useWorkspaceContext();

  const handleAddNote = () => {
    if (activeWorkspaceId) {
      const activeWorkspace = workspaces.find(
        (ws) => ws.id === activeWorkspaceId
      );

      if (activeWorkspace) {
        const note = addNote(activeWorkspace.id, null);
        return note;
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleAddNote}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Crear Nota
      </button>
    </div>
  );
};
