import React from "react";
import useAside from "./use-aside.hook";
import { ContextMenu } from "@/common/components/";
import { NoteItem } from "./components/";

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
    <aside className="relative flex flex-col p-4">
      {folders.map((folder) => (
        <div key={folder.id} className="mb-4">
          {activeWorkspaceId !== folder.id && (
            <h3 className="text-lg font-semibold">{folder.name}</h3>
          )}
          {folder.notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              editingNoteId={editingNoteId}
              newNoteName={newNoteName}
              onClick={() => setActiveNoteId(note.id)}
              onContextMenu={(e) => handleContextMenu(e, note)}
              onInputChange={handleInputChange}
              onInputBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
          ))}
        </div>
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
