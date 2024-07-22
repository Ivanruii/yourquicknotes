import React, { useEffect, useRef, useState } from "react";
import { NoteItem } from "./note.component";
import { NoteModel } from "@/core/providers";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { ChevronDown, ChevronRight } from "@/common/components";

interface FolderProps {
  folder: {
    id: string;
    name: string;
    notes: NoteModel[];
  };
  activeWorkspaceId: string | null;
  editingNoteId: string | null;
  newNoteName: string;
  setActiveNoteId: (noteId: string) => void;
  handleContextMenu: (e: React.MouseEvent, note: NoteModel) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const Folder: React.FC<FolderProps> = ({
  folder,
  activeWorkspaceId,
  editingNoteId,
  newNoteName,
  setActiveNoteId,
  handleContextMenu,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
}) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isFolderCollapsed, setFolderCollapsed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ folder }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);
  return (
    <div
      key={folder.id}
      className="flex flex-col gap-4"
      ref={ref}
      style={
        isDraggedOver
          ? { backgroundColor: "lightblue" }
          : { backgroundColor: "transparent" }
      }
    >
      {activeWorkspaceId !== folder.id && (
        <div className="flex gap-3">
          {isFolderCollapsed ? <ChevronRight /> : <ChevronDown />}
          <h3
            onClick={() =>
              isFolderCollapsed
                ? setFolderCollapsed(false)
                : setFolderCollapsed(true)
            }
            className="font-semibold cursor-pointer select-none"
          >
            {folder.name}
          </h3>
        </div>
      )}
      {folder.notes.map(
        (note) =>
          !isFolderCollapsed && (
            <NoteItem
              key={note.id}
              note={note}
              editingNoteId={editingNoteId}
              newNoteName={newNoteName}
              folder={folder}
              onClick={() => setActiveNoteId(note.id)}
              onContextMenu={(e) => handleContextMenu(e, note)}
              onInputChange={handleInputChange}
              onInputBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
          )
      )}
    </div>
  );
};
