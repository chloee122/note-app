import { Editor } from "@tiptap/react";
import { useState } from "react";
import { EditorMenuBarWrapper } from "../styles/EditorMenuBar.styled";
import { Level } from "@tiptap/extension-heading";
import { MdExpandMore } from "react-icons/md";
import { FaHeading } from "react-icons/fa6";
import { GrUnorderedList } from "react-icons/gr";
import { BiHighlight } from "react-icons/bi";
import { GoBold } from "react-icons/go";
import { FiItalic } from "react-icons/fi";
import { RxUnderline } from "react-icons/rx";
import { GoCheckbox } from "react-icons/go";

interface EditorMenuBarProps {
  editor: Editor;
}

const HEADING_NUMBERS = [1, 2, 3, 4, 5, 6];
const HIGHLIGHT_COLOR = [
  { colorName: "Blue", colorCode: "#9fd0f6" },
  { colorName: "Purple", colorCode: "#c9b9f9" },
  { colorName: "Red", colorCode: "#fbc5c5" },
  { colorName: "Yellow", colorCode: "#f9f4a2" },
  { colorName: "Orange", colorCode: "#fbc88e" },
];

function EditorMenuBar({ editor }: EditorMenuBarProps) {
  const [shouldShowHeadingBtns, setShouldShowHeadingBtns] = useState(false);
  const [shouldShowHighlightColorBtns, setShouldShowHighlightColorBtns] =
    useState(false);
  const [shouldShowListBtns, setShouldShowListBtns] = useState(false);

  const headingBtns = (HEADING_NUMBERS as Level[]).map((headingNum) => {
    return (
      <button
        onClick={() => {
          setShouldShowHeadingBtns(false);
          editor.chain().focus().toggleHeading({ level: headingNum }).run();
        }}
        className={
          editor.isActive("heading", { level: headingNum }) ? "active" : ""
        }
      >
        Heading {headingNum}
      </button>
    );
  });

  const HighlightBtns = HIGHLIGHT_COLOR.map((colorObj) => {
    const { colorName, colorCode } = colorObj;
    return (
      <button
        onClick={() => {
          setShouldShowHighlightColorBtns(false);
          editor.chain().focus().toggleHighlight({ color: colorCode }).run();
        }}
        className={
          editor.isActive("highlight", { color: colorCode }) ? "active" : ""
        }
      >
        {colorName}
      </button>
    );
  });

  const ListBtns = (
    <div>
      <button
        onClick={() => {
          setShouldShowListBtns(false);
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        List
      </button>
      <button
        onClick={() => {
          setShouldShowListBtns(false);
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        Ordered List
      </button>
    </div>
  );

  return (
    <EditorMenuBarWrapper>
      <div>{shouldShowHeadingBtns && headingBtns}</div>
      <button onClick={() => setShouldShowHeadingBtns(true)}>
        <FaHeading size={13} />
        <MdExpandMore size={13} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "is-active" : ""}
      >
        <GoCheckbox size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        <GoBold size={18} strokeWidth={0.5} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <FiItalic size={17} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        <RxUnderline size={19} strokeWidth={0.1} />
      </button>
      <button onClick={() => setShouldShowListBtns(true)}>
        <GrUnorderedList size={19} />
      </button>
      {shouldShowListBtns && ListBtns}
      <button onClick={() => setShouldShowHighlightColorBtns(true)}>
        <BiHighlight size={18} />
      </button>
      <div>{shouldShowHighlightColorBtns && HighlightBtns}</div>
    </EditorMenuBarWrapper>
  );
}

export default EditorMenuBar;
