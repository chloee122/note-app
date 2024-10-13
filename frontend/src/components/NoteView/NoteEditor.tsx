import { useState } from "react";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import EditorMenuBar from "./EditorMenuBar";

interface NoteEditorProps {
  shouldShowEditorMenuBar: boolean;
}

function NoteEditor({ shouldShowEditorMenuBar }: NoteEditorProps) {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Placeholder.configure({
        placeholder: "Write something…",
      }),
    ],
    autofocus: true,
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
      {shouldShowEditorMenuBar && <EditorMenuBar editor={editor} />}
    </>
  );
}

export default NoteEditor;