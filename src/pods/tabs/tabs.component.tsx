import { useWorkspaceContext } from "@/core/providers";
import { useRef } from "react";

export const Tabs = () => {
  const { activeNotes, setActiveNoteDisplay, removeActiveNote } =
    useWorkspaceContext();

  const closeButton = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <ul className="flex ">
        {activeNotes.map((activeNote) => (
          <li
            key={activeNote.note.id}
            className={`flex gap-4  p-2 border-b ${
              activeNote.display
                ? "border-white bg-[#282c34]"
                : "border-transparent"
            }`}
          >
            <button
              onClick={() => setActiveNoteDisplay(activeNote.note.id, true)}
            >
              {activeNote.note.name || "Untitled Note"}
            </button>
            <button
              ref={closeButton}
              onClick={() => {
                removeActiveNote(activeNote.note.id);
              }}
            >
              {activeNote.display ? "✕" : ""}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
