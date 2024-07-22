import { useState, useEffect, useRef } from "react";
import { useWorkspaceContext } from "@/core/providers";
import { NoteModel } from "@/core/providers";

const useAside = () => {
  const {
    workspaces,
    activeWorkspaceId,
    deleteNote,
    setNoteName,
    activeNotes,
    setActiveNoteDisplay,
  } = useWorkspaceContext();

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNoteName, setNewNoteName] = useState<string>("");
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId
  );
  const firstFolder = activeWorkspace?.folders[0];
  const notes = firstFolder ? firstFolder.notes : [];

  const displayedNote = activeNotes.find((note) => note.display === true)?.note;

  const setActiveNoteId = (noteId: string) => {
    setActiveNoteDisplay(noteId, true);
  };

  const handleContextMenu = (e: React.MouseEvent, note: NoteModel) => {
    e.preventDefault();
    setActiveNoteDisplay(note.id, true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteName(e.target.value);
  };

  const handleInputBlur = () => {
    if (displayedNote && activeWorkspaceId && firstFolder) {
      setNoteName(
        activeWorkspaceId,
        firstFolder.id,
        displayedNote.id,
        newNoteName
      );
    }
    setEditingNoteId(null);
    setNewNoteName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const getContextMenuOptions = (noteId: string) => [
    {
      label: "Edit",
      action: () => {
        setEditingNoteId(noteId);
        const note = notes.find((note) => note.id === noteId);
        setNewNoteName(note ? note.name : "");
        setShowContextMenu(false);
      },
    },
    {
      label: "Delete",
      action: () => {
        if (activeWorkspaceId && firstFolder) {
          deleteNote(activeWorkspaceId, firstFolder.id, noteId);
        }
        setShowContextMenu(false);
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenuRef]);

  return {
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
  };
};

export default useAside;
