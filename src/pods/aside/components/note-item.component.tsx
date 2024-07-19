import { ChangeEvent, KeyboardEvent } from "react";

interface NoteItemProps {
  note: { id: string; name: string };
  isEditing: boolean;
  newNoteName: string;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const NoteItem = ({
  note,
  isEditing,
  newNoteName,
  onClick,
  onContextMenu,
  onInputChange,
  onInputBlur,
  onKeyDown,
}: NoteItemProps) => {
  return (
    <div onContextMenu={onContextMenu}>
      {isEditing ? (
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
          className="block w-full p-2 mb-2 text-left text-white bg-blue-500 rounded cursor-pointer"
        >
          {note.name}
        </span>
      )}
    </div>
  );
};
