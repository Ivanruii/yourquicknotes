import { useContext, useEffect, useState } from "react";
import {
  createInitialNote,
  createInitialWorkspace,
  createInitialFolder,
  WorkspaceModel,
  NoteModel,
} from "./workspace.model";
import { WorkspaceContext } from "./workspace.context";

interface Props {
  children: React.ReactNode;
}

export const WorkspaceProvider = (props: Props) => {
  const { children } = props;
  const [workspaces, setWorkspaces] = useState<WorkspaceModel[]>([
    createInitialWorkspace(),
  ]);

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(
    workspaces[0].id
  );

  const [activeNotes, setActiveNotes] = useState<
    { note: NoteModel; display: boolean }[]
  >([]);

  const addWorkspace = () => {
    const newWorkspace = createInitialWorkspace();
    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
    setActiveWorkspaceId(newWorkspace.id);
  };

  const deleteWorkspace = (id: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.filter((workspace) => workspace.id !== id)
    );
    if (activeWorkspaceId === id && workspaces.length > 0) {
      setActiveWorkspaceId(workspaces[0].id);
    } else if (workspaces.length === 0) {
      setActiveWorkspaceId(null);
    }
  };

  const addFolder = (workspaceId: string, folderName: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              folders: [
                ...workspace.folders,
                { id: crypto.randomUUID(), name: folderName, notes: [] },
              ],
            }
          : workspace
      )
    );
  };

  const deleteFolder = (workspaceId: string, folderId: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              folders: workspace.folders.filter(
                (folder) => folder.id !== folderId
              ),
            }
          : workspace
      )
    );
  };

  const addNote = (workspaceId: string, folderId: string | null) => {
    const newNote = createInitialNote();

    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          if (folderId === null) {
            let rootFolder = workspace.folders.find(
              (folder) => folder.id === workspace.id
            );

            if (!rootFolder) {
              rootFolder = createInitialFolder(workspace);
              return {
                ...workspace,
                folders: [...workspace.folders, rootFolder].map((folder) =>
                  folder.id === rootFolder!.id
                    ? { ...folder, notes: [...folder.notes, newNote] }
                    : folder
                ),
              };
            }

            return {
              ...workspace,
              folders: workspace.folders.map((folder) =>
                folder.id === rootFolder!.id
                  ? { ...folder, notes: [...folder.notes, newNote] }
                  : folder
              ),
            };
          }

          return {
            ...workspace,
            folders: workspace.folders.map((folder) =>
              folder.id === folderId
                ? { ...folder, notes: [...folder.notes, newNote] }
                : folder
            ),
          };
        }
        return workspace;
      });
    });

    return newNote;
  };

  const deleteNote = (
    workspaceId: string,
    folderId: string | null,
    noteId: string
  ) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              folders: workspace.folders.map((folder) =>
                folder.id === folderId || folderId === null
                  ? {
                      ...folder,
                      notes: folder.notes.filter((note) => note.id !== noteId),
                    }
                  : folder
              ),
            }
          : workspace
      )
    );
  };

  const setNoteName = (
    workspaceId: string,
    folderId: string | null,
    noteId: string,
    name: string
  ) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              folders: workspace.folders.map((folder) =>
                folder.id === folderId || folderId === null
                  ? {
                      ...folder,
                      notes: folder.notes.map((note) =>
                        note.id === noteId ? { ...note, name } : note
                      ),
                    }
                  : folder
              ),
            }
          : workspace
      )
    );
  };

  const setNoteContent = (
    workspaceId: string,
    folderId: string | null,
    noteId: string,
    content: string
  ) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              folders: workspace.folders.map((folder) =>
                folder.id === folderId || folderId === null
                  ? {
                      ...folder,
                      notes: folder.notes.map((note) =>
                        note.id === noteId ? { ...note, content } : note
                      ),
                    }
                  : folder
              ),
            }
          : workspace
      )
    );
  };

  const setActiveNoteDisplay = (noteId: string, display: boolean) => {
    setActiveNotes((prevActiveNotes) => {
      const updatedNotes = prevActiveNotes.map((activeNote) => ({
        ...activeNote,
        display: false,
      }));

      if (display) {
        const existingNoteIndex = prevActiveNotes.findIndex(
          (activeNote) => activeNote.note.id === noteId
        );

        if (existingNoteIndex >= 0) {
          updatedNotes[existingNoteIndex] = {
            ...updatedNotes[existingNoteIndex],
            display: true,
          };
        } else {
          updatedNotes.push({
            note: { id: noteId, name: "", content: "" },
            display: true,
          });
        }
      }

      return updatedNotes;
    });
  };

  const moveNote = (
    noteId: string,
    startFolderId: string,
    finishFolderId: string
  ) => {
    if (startFolderId === finishFolderId) {
      return;
    }
    setWorkspaces((prevWorkspaces) => {
      const updatedWorkspaces = prevWorkspaces.map((workspace) => {
        const sourceFolderIndex = workspace.folders.findIndex(
          (folder) => folder.id === startFolderId
        );
        const destinationFolderIndex = workspace.folders.findIndex(
          (folder) => folder.id === finishFolderId
        );

        if (sourceFolderIndex === -1 || destinationFolderIndex === -1) {
          return workspace;
        }

        const sourceFolder = workspace.folders[sourceFolderIndex];
        const destinationFolder = workspace.folders[destinationFolderIndex];

        const note = sourceFolder.notes.find((note) => note.id === noteId);
        if (!note) return workspace;

        const updatedSourceFolder = {
          ...sourceFolder,
          notes: sourceFolder.notes.filter((note) => note.id !== noteId),
        };

        const updatedDestinationFolder = {
          ...destinationFolder,
          notes: [...destinationFolder.notes, note],
        };

        return {
          ...workspace,
          folders: workspace.folders.map((folder, index) =>
            index === sourceFolderIndex
              ? updatedSourceFolder
              : index === destinationFolderIndex
              ? updatedDestinationFolder
              : folder
          ),
        };
      });

      return updatedWorkspaces;
    });
  };

  const saveWorkspaces = () => {
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
    localStorage.setItem("activeNotes", JSON.stringify(activeNotes));
  };

  const loadWorkspaces = () => {
    const storedWorkspaces = localStorage.getItem("workspaces");
    if (storedWorkspaces) {
      setWorkspaces(JSON.parse(storedWorkspaces));
    }
    const storedActiveNotes = localStorage.getItem("activeNotes");
    if (storedActiveNotes) {
      setActiveNotes(JSON.parse(storedActiveNotes));
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  useEffect(() => {
    saveWorkspaces();
  }, [workspaces, activeNotes]);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspaceId,
        setActiveWorkspaceId,
        addWorkspace,
        deleteWorkspace,
        addFolder,
        deleteFolder,
        addNote,
        deleteNote,
        setNoteName,
        setNoteContent,
        activeNotes,
        setActiveNoteDisplay,
        moveNote,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);
  if (context === null) {
    throw new Error(
      "useWorkspaceContext: looks like you have forgotten to add the provider on top of the app :)"
    );
  }
  return context;
};
