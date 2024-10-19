import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import EditorMenuBar from "./EditorMenuBar";

interface NoteEditorProps {
  shouldShowEditorMenuBar: boolean;
}

function NoteEditor({ shouldShowEditorMenuBar }: NoteEditorProps) {
  const [editorContent, setEditorContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "taskList") {
            return "";
          } else {
            return "Write something...";
          }
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    autofocus: true,
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
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