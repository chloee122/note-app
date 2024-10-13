import { Editor } from "@tiptap/react";
import { useState } from "react";
import { EditorMenuBarWrapper } from "../styles/EditorMenuBar.styled";

interface EditorMenuBarProps {
  editor: Editor;
}

function EditorMenuBar({ editor }: EditorMenuBarProps) {
  const [shouldShowHeadingBtns, setShouldShowHeadingBtns] = useState(false);

  const headingBtns = (
    <div>
      <button
        onClick={() => {
          setShouldShowHeadingBtns(false);
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "active" : ""}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "active" : ""}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "active" : ""}
      >
        H6
      </button>
    </div>
  );
  return (
    <EditorMenuBarWrapper>
      {shouldShowHeadingBtns && headingBtns}
      <button onClick={() => setShouldShowHeadingBtns(true)}>H</button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "active" : ""}
      >
        Toggle highlight
      </button>
    </EditorMenuBarWrapper>
  );
}

export default EditorMenuBar;
