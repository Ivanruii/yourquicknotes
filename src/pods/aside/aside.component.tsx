import React from "react";
import useAside from "./use-aside.hook";
import { ContextMenu } from "@/common/components/";
import { NoteItem } from "./components/";

export const Aside: React.FC = () => {
  const {
    notes,
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
  } = useAside();

  return (
    <aside className="relative flex flex-col p-4">
      {notes.map((note) => (
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

      <ContextMenu
        show={showContextMenu}
        position={contextMenuPosition}
        options={displayedNote ? getContextMenuOptions(displayedNote.id) : []}
        contextMenuRef={contextMenuRef}
      />
    </aside>
  );
};
