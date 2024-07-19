import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useNotesContext } from "@/core/providers/notes/notes.provider";
import { getContextMenuActions } from "./aside.consts";

export const useAside = () => {
  const { notes, setActiveNoteId, setNoteName } = useNotesContext();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNoteName, setNewNoteName] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (e: MouseEvent, noteName: string) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
    setNewNoteName(noteName);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNoteName(e.target.value);
  };

  const handleInputBlur = () => {
    if (editingNoteId && newNoteName.trim() !== "") {
      setNoteName(editingNoteId, newNoteName);
      setEditingNoteId(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const contextMenuActions = getContextMenuActions(
    notes,
    editingNoteId,
    newNoteName,
    setNoteName,
    setEditingNoteId
  );

  return {
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
  };
};
