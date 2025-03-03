import React, { useEffect, useRef, useState } from 'react';
import { NoteItem } from './note.component';
import { NoteModel } from '@/core/providers';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import {
  ChevronDown,
  ChevronRight,
  FolderClose,
  FolderOpen,
} from '@/common/components';

interface FolderProps {
  folder: {
    id: string;
    name: string;
    notes: NoteModel[];
  };
  activeWorkspaceId: string | null;
  editingNoteId: string | null;
  newNoteName: string;
  setActiveNoteId: (note: NoteModel) => void;
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
      className="flex flex-col gap-1"
      ref={ref}
      style={
        isDraggedOver
          ? { backgroundColor: 'lightblue' }
          : { backgroundColor: 'transparent' }
      }
    >
      {activeWorkspaceId !== folder.id && (
        <div
          onClick={() =>
            isFolderCollapsed
              ? setFolderCollapsed(false)
              : setFolderCollapsed(true)
          }
          className="flex gap-2 cursor-pointer"
        >
          {isFolderCollapsed ? (
            <>
              <ChevronRight width={15} />
              <FolderOpen width={15} />
            </>
          ) : (
            <>
              <ChevronDown width={15} />
              <FolderClose width={15} />
            </>
          )}
          <h3 className="font-semibold select-none">{folder.name}</h3>
        </div>
      )}
      {folder.notes.map(
        note =>
          !isFolderCollapsed && (
            <NoteItem
              key={note.id}
              note={note}
              editingNoteId={editingNoteId}
              activeWorkSpaceId={activeWorkspaceId}
              newNoteName={newNoteName}
              folder={folder}
              onClick={() => setActiveNoteId(note)}
              onContextMenu={e => handleContextMenu(e, note)}
              onInputChange={handleInputChange}
              onInputBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
          )
      )}
    </div>
  );
};
