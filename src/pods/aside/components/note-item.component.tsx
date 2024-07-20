import React from "react";
import { NoteModel } from "@/core/providers/notes/notes.model";

interface NoteItemProps {
  note: NoteModel;
  editingNoteId: string | null;
  newNoteName: string;
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
  onClick,
  onContextMenu,
  onInputChange,
  onInputBlur,
  onKeyDown,
}) => {
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
      className="block w-full p-2 mb-2 text-left text-white bg-blue-500 rounded cursor-pointer"
    >
      {note.name}
    </span>
  );
};
