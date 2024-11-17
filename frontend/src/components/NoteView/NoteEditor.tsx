import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import EditorMenuBar from "./EditorMenuBar";
import { Note } from "../../common/internal";

interface NoteEditorProps {
  shouldShowEditorMenuBar: boolean;
  activeNote: Note;
  setActiveNote: (arg: Note) => void;
}

function NoteEditor({
  shouldShowEditorMenuBar,
  activeNote,
  setActiveNote,
}: NoteEditorProps) {
  const handleEditorUpdate = ({ editor }: { editor: Editor }) => {
    setActiveNote({
      ...activeNote,
      htmlContent: editor.getHTML(),
      plainTextContent: editor.getText(),
    });
  };

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
    autofocus: "end",
    content: activeNote.htmlContent,
    onUpdate: handleEditorUpdate,
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent editor={editor} />
      {shouldShowEditorMenuBar && <EditorMenuBar editor={editor} />}
    </>
  );
}

export default NoteEditor;
