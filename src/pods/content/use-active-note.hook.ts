import { useEffect, useRef } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { useWorkspaceContext } from '@/core/providers/';

export const useActiveNote = () => {
  const {
    workspaces,
    activeWorkspaceId,
    setNoteContent,
    activeNotes,
    setActiveNoteDisplay,
  } = useWorkspaceContext();
  const editorRef = useRef<MDXEditorMethods | null>(null);

  const findActiveNote = () => {
    if (activeWorkspaceId) {
      const activeWorkspace = workspaces.find(
        workspace => workspace.id === activeWorkspaceId
      );

      if (activeWorkspace) {
        for (const folder of activeWorkspace.folders) {
          for (const activeNote of activeNotes) {
            if (activeNote.display) {
              const note = folder.notes.find(
                note => note.id === activeNote.note.id
              );
              if (note) {
                return { folderId: folder.id, note };
              }
            }
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const activeNoteObj = findActiveNote();
    if (activeNoteObj) {
      const { note } = activeNoteObj;
      setActiveNoteDisplay(note, true);
      if (editorRef.current) {
        editorRef.current.setMarkdown(note.content);
      }
    } else {
      if (editorRef.current) {
        editorRef.current.setMarkdown('');
      }
    }
  }, [activeWorkspaceId, activeNotes, workspaces]);

  const handleEditorChange = (newContent: string) => {
    const activeNoteObj = findActiveNote();
    if (activeNoteObj) {
      const { folderId, note } = activeNoteObj;

      setNoteContent(activeWorkspaceId!, folderId, note.id, newContent);
    }
  };

  return { activeNotes, editorRef, handleEditorChange };
};
