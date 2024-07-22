import { useWorkspaceContext } from "@/core/providers/";
import { File, FolderPlus } from "@/common/components/";
export const Actions = () => {
  const { workspaces, activeWorkspaceId, addNote, addFolder } =
    useWorkspaceContext();
  const activeWorkspace = workspaces.find((ws) => ws.id === activeWorkspaceId);

  const handleAddNote = () => {
    if (activeWorkspace) {
      const note = addNote(activeWorkspace.id, null);
      return note;
    }
  };

  const handleAddFolder = () => {
    if (activeWorkspace) {
      const folder = addFolder(activeWorkspace.id, "New Folder");
      return folder;
    }
  };

  return (
    <div className="flex justify-between px-2 py-2">
      <h3 className="text-xl ">{activeWorkspace?.name}</h3>

      <div className="flex justify-between gap-4">
        <button onClick={handleAddNote}>
          <File width={20} />
        </button>
        <button onClick={handleAddFolder}>
          <FolderPlus width={22} />
        </button>
      </div>
    </div>
  );
};
