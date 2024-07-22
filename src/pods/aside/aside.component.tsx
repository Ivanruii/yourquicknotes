import React, { useRef } from "react";
import useAside from "./use-aside.hook";
import { ContextMenu } from "@/common/components/";
import { Folder } from "./components/folder.component";
import { useEffect } from "react";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { FolderModel, NoteModel } from "@/core/providers";
import invariant from "tiny-invariant";

export const Aside: React.FC = () => {
  const {
    folders,
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
    activeWorkspaceId,
    moveNote,
  } = useAside();
  const ref = useRef(null);
  const folder = folders.find((folder) => folder.id === activeWorkspaceId);
  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          return;
        }

        const destinationLocation = destination.data.folder as FolderModel;
        const note = source.data.note as NoteModel;
        const noteFolder = source.data.folder as FolderModel;

        if (!destinationLocation || !noteFolder || !note) {
          return;
        }

        moveNote(note.id, noteFolder.id, destinationLocation.id);
      },
    });
  }, [folders]);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ folder }),
    });
  }, []);

  return (
    <aside className="min-h-screen p-4" ref={ref}>
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          activeWorkspaceId={activeWorkspaceId}
          editingNoteId={editingNoteId}
          newNoteName={newNoteName}
          setActiveNoteId={setActiveNoteId}
          handleContextMenu={handleContextMenu}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
          handleKeyDown={handleKeyDown}
        />
      ))}

      <ContextMenu
        show={showContextMenu}
        position={contextMenuPosition}
        options={displayedNote ? getContextMenuOptions(displayedNote.id) : []}
        contextMenuRef={contextMenuRef}
      />
    </aside>
  );
};
