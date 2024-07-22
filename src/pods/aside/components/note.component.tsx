import React, { useEffect, useRef, useState } from "react";
import { FolderModel, NoteModel } from "@/core/providers/";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface NoteItemProps {
  note: NoteModel;
  editingNoteId: string | null;
  newNoteName: string;
  folder: FolderModel;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  editingNoteId,
  newNoteName,
  folder,
  onClick,
  onContextMenu,
  onInputChange,
  onInputBlur,
  onKeyDown,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, note, folder }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return editingNoteId === note.id ? (
    <input
      type="text"
      value={newNoteName}
      onChange={onInputChange}
      onBlur={onInputBlur}
      onKeyDown={onKeyDown}
      className="block w-full p-2 mb-2 text-left text-white bg-blue-500 border-none rounded"
      autoFocus
    />
  ) : (
    <span
      onClick={onClick}
      onContextMenu={onContextMenu}
      className="cursor-pointer"
      ref={ref}
      style={{ opacity: dragging ? 0.4 : 1 }}
    >
      {note.name}
    </span>
  );
};
