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

  const focusedEditor = editor.chain().focus();
  const canFocusedEditorRun = editor.can().chain().focus();
  const getMarkClassName = (
    mark: string,
    attribute?: { level: Level } | { color: string }
  ) => (editor.isActive(mark, attribute || {}) ? "active" : "");

  const headingBtns = (HEADING_NUMBERS as Level[]).map((headingNum) => {
    return (
      <button
        key={headingNum}
        onClick={() => {
          setShouldShowHeadingBtns(false);
          focusedEditor.toggleHeading({ level: headingNum }).run();
        }}
        className={getMarkClassName("heading", { level: headingNum })}
      >
        Heading {headingNum}
      </button>
    );
  });

  const HighlightBtns = HIGHLIGHT_COLOR.map((colorObj) => {
    const { colorName, colorCode } = colorObj;
    return (
      <button
        key={colorCode}
        onClick={() => {
          setShouldShowHighlightColorBtns(false);
          focusedEditor.toggleHighlight({ color: colorCode }).run();
        }}
        className={getMarkClassName("highlight", { color: colorCode })}
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
          focusedEditor.toggleBulletList().run();
        }}
        className={getMarkClassName("bulletList")}
      >
        List
      </button>
      <button
        onClick={() => {
          setShouldShowListBtns(false);
          focusedEditor.toggleOrderedList().run();
        }}
        className={getMarkClassName("orderedList")}
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
        onClick={() => focusedEditor.toggleTaskList().run()}
        className={getMarkClassName("taskList")}
      >
        <GoCheckbox size={18} />
      </button>
      <button
        onClick={() => focusedEditor.toggleBold().run()}
        disabled={!canFocusedEditorRun.toggleBold().run()}
        className={getMarkClassName("bold")}
      >
        <GoBold size={18} strokeWidth={0.5} />
      </button>
      <button
        onClick={() => focusedEditor.toggleItalic().run()}
        disabled={!canFocusedEditorRun.toggleItalic().run()}
        className={getMarkClassName("italic")}
      >
        <FiItalic size={17} />
      </button>
      <button
        onClick={() => focusedEditor.toggleUnderline().run()}
        disabled={!canFocusedEditorRun.toggleUnderline().run()}
        className={getMarkClassName("underline")}
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
