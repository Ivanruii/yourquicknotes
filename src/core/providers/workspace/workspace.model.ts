export interface NoteModel {
  id: string;
  name: string;
  content: string;
}

export const createInitialNote = (): NoteModel => ({
  id: crypto.randomUUID(),
  name: 'Nota vacia',
  content: 'Nota sin contenido.',
});

export interface FolderModel {
  id: string;
  name: string;
  notes: NoteModel[];
}

export interface WorkspaceModel {
  id: string;
  name: string;
  folders: FolderModel[];
}

export const createInitialWorkspace = (): WorkspaceModel => ({
  id: crypto.randomUUID(),
  name: 'Workspace inicial',
  folders: [],
});

export const createInitialFolder = (
  workspace: WorkspaceModel
): FolderModel => ({
  id: workspace.id,
  name: `Workspace root folder (${workspace.id})`,
  notes: [],
});

export interface WorkspaceContextModel {
  workspaces: WorkspaceModel[];
  activeWorkspaceId: string | null;
  setActiveWorkspaceId: (id: string) => void;
  addWorkspace: () => void;
  deleteWorkspace: (id: string) => void;
  addFolder: (workspaceId: string, folderName: string) => void;
  deleteFolder: (workspaceId: string, folderId: string) => void;
  addNote: (workspaceId: string, folderId: string | null) => void;
  deleteNote: (workspaceId: string, folderId: string, noteId: string) => void;
  setNoteName: (
    workspaceId: string,
    folderId: string,
    noteId: string,
    name: string
  ) => void;
  setNoteContent: (
    workspaceId: string,
    folderId: string,
    noteId: string,
    content: string
  ) => void;
  moveNote: (
    noteId: string,
    startFolderId: string,
    finishFolderId: string
  ) => void;
  activeNotes: { note: NoteModel; display: boolean }[];
  setActiveNoteDisplay: (note: NoteModel, display: boolean) => void;
  removeActiveNote: (noteId: string) => void;
}
