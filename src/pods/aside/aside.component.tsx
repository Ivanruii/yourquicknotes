import React from "react";
import useAside from "./use-aside.hook";
import { ContextMenu } from "@/common/components/";
import { Folder } from "./components/folder.component";

export const Aside: React.FC = () => {
  const {
    folders,
    editingNoteId,
    newNoteName,
    showContextMenu,
    contextMenuPosition,
    displayedNote,
    handleContextMenu,
    handleInputChange,
    handleInputBlur,
    handleKeyDown,
    setActiveNoteId,
    getContextMenuOptions,
    contextMenuRef,
    activeWorkspaceId,
  } = useAside();

  return (
    <aside className="p-4">
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          activeWorkspaceId={activeWorkspaceId}
          editingNoteId={editingNoteId}
          newNoteName={newNoteName}
          setActiveNoteId={setActiveNoteId}
          handleContextMenu={handleContextMenu}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
          handleKeyDown={handleKeyDown}
        />
      ))}

      <ContextMenu
        show={showContextMenu}
        position={contextMenuPosition}
        options={displayedNote ? getContextMenuOptions(displayedNote.id) : []}
        contextMenuRef={contextMenuRef}
      />
    </aside>
  );
};
