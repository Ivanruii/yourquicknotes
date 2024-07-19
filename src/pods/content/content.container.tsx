import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  BoldItalicUnderlineToggles,
  UndoRedo,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useNotesContext } from "@/core/providers/notes/notes.provider";

export const Content = () => {
  const { notes, activeNoteId } = useNotesContext();
  const activeNote = notes.find((note) => note.id === activeNoteId);
  return (
    <div className="w-3/4 p-4">
      {activeNote ? (
        <>
          <MDXEditor
            markdown={activeNote.content}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    {" "}
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                  </>
                ),
              }),
            ]}
          />
        </>
      ) : (
        <p>No note selected</p>
      )}
    </div>
  );
};
