import {
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  BoldItalicUnderlineToggles,
  UndoRedo,
  toolbarPlugin,
  InsertTable,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertCodeBlock,
  diffSourcePlugin,
  thematicBreakPlugin,
  MDXEditorMethods,
  imagePlugin,
  InsertImage,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { ForwardedRef, forwardRef } from "react";
import { ImageDialog } from "./";

interface NoteEditorProps {
  markdown: string;
  onChange: (newContent: string) => void;
}

export const NoteEditor = forwardRef<MDXEditorMethods, NoteEditorProps>(
  ({ markdown, onChange }, ref: ForwardedRef<MDXEditorMethods>) => (
    <>
      <MDXEditor
        ref={ref}
        className="dark"
        markdown={markdown}
        onChange={onChange}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              ts: "TypeScript",
            },
          }),
          diffSourcePlugin({
            viewMode: "rich-text",
          }),
          thematicBreakPlugin(),
          imagePlugin({
            imageUploadHandler: (image: File) => {
              if (image) {
                return Promise.resolve(URL.createObjectURL(image));
              }
              // TODO: Add error image.

              return Promise.resolve("https://picsum.photos/200/300");
            },
            ImageDialog: ImageDialog,
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertTable />
                <InsertCodeBlock />
                <InsertImage />
              </>
            ),
          }),
        ]}
      />
    </>
  )
);
