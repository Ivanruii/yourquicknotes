import {
  useState,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { useNotesContext } from "@/core/providers/notes/notes.provider";
import { NoteModel } from "@/core/providers/notes/notes.model";

const useAside = () => {
  const { notes, setActiveNoteId, setNoteName, deleteNote } = useNotesContext();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNoteName, setNewNoteName] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: MouseEvent, note: NoteModel) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
    setSelectedNoteId(note.id);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNoteName(e.target.value);
  };

  const handleInputBlur = () => {
    if (editingNoteId && newNoteName.trim() !== "") {
      setNoteName(editingNoteId, newNoteName);
      setEditingNoteId(null);
      setNewNoteName("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(e.target as Node)
    ) {
      setShowContextMenu(false);
      setSelectedNoteId(null);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  const getContextMenuOptions = (noteId: string) => {
    return [
      {
        label: "Edit Note",
        action: () => {
          const selectedNote = notes.find((note) => note.id === noteId);
          if (selectedNote) {
            setEditingNoteId(noteId);
            setNewNoteName(selectedNote.name);
            setShowContextMenu(false);
          }
        },
      },
      {
        label: "Delete",
        action: () => {
          deleteNote(noteId);
          setShowContextMenu(false);
        },
      },
    ];
  };

  return {
    notes,
    editingNoteId,
    newNoteName,
    showContextMenu,
    contextMenuPosition,
    selectedNoteId,
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
