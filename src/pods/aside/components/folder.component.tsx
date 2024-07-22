import React from "react";
import { NoteItem } from "./note.component";
import { NoteModel } from "@/core/providers";

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
  return (
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
  );
};
