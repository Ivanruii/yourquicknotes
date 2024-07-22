import { useWorkspaceContext } from "@/core/providers/";

export const Actions = () => {
  const { workspaces, activeWorkspaceId, addNote, addFolder } =
    useWorkspaceContext();

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

  const handleAddFolder = () => {
    if (activeWorkspaceId) {
      const activeWorkspace = workspaces.find(
        (ws) => ws.id === activeWorkspaceId
      );
      if (activeWorkspace) {
        const folder = addFolder(activeWorkspace.id, "New Folder");
        return folder;
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleAddNote}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        New Note
      </button>
      <button
        onClick={handleAddFolder}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        New Folder
      </button>
    </div>
  );
};
