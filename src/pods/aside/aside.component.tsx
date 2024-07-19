import { ContextMenu } from "@/common/context-menu";
import { NoteItem } from "./components/note-item.component";
import { useAside } from "./use-aside.hook";

export const Aside = () => {
  const {
    notes,
    showContextMenu,
    contextMenuPosition,
    handleContextMenu,
    handleInputChange,
    handleInputBlur,
    handleKeyDown,
    contextMenuActions,
    setShowContextMenu,
    setActiveNoteId,
  } = useAside();

  return (
    <aside className="relative p-4 bg-gray-100">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          isEditing={note.id === contextMenuActions.editingNoteId}
          newNoteName={contextMenuActions.newNoteName}
          onClick={() => setActiveNoteId(note.id)}
          onContextMenu={(e) => handleContextMenu(e, note.name)}
          onInputChange={handleInputChange}
          onInputBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ))}

      {showContextMenu && contextMenuPosition && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => setShowContextMenu(false)}
          actions={contextMenuActions.actions}
        />
      )}
    </aside>
  );
};
