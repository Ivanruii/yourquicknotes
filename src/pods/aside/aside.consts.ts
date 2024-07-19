export const getContextMenuActions = (
  notes: { id: string; name: string }[],
  editingNoteId: string | null,
  newNoteName: string,
  setNoteName: (id: string, name: string) => void,
  setEditingNoteId: (id: string | null) => void
) => {
  return {
    actions: [
      {
        label: "Rename",
        onClick: () => {
          if (editingNoteId) {
            setNoteName(editingNoteId, newNoteName);
            setEditingNoteId(null);
          } else {
            setEditingNoteId(
              notes.find((note) => note.name === newNoteName)?.id || null
            );
          }
        },
      },
    ],
    editingNoteId,
    newNoteName,
  };
};
