import { GoBold } from "react-icons/go";
import { FiItalic } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxUnderline } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteBtn, NoteTitle } from "../styles/NoteToolBar.styled";
import {
  ActionBtns,
  NoteToolBarWrapper,
  ToolBarContent,
} from "../styles/shared/ToolBar.styled";
import useAppContext from "../../hooks/useAppContext";

interface NoteToolBarProps {
  noteScrolled: boolean;
  shouldShowTitleOnToolBar: boolean;
  setShouldShowEditorMenuBar: (arg: boolean) => void;
  shouldShowEditorMenuBar: boolean;
}

function NoteToolBar({
  noteScrolled,
  shouldShowTitleOnToolBar,
  setShouldShowEditorMenuBar,
  shouldShowEditorMenuBar,
}: NoteToolBarProps) {
  const { selectedNote, removeNote } = useAppContext();

  const handleDeleteNote = () => {
    if (!selectedNote) return;
    removeNote(selectedNote.id);
  };

  return (
    <NoteToolBarWrapper $borderEffect={noteScrolled}>
      <ToolBarContent>
        <NoteTitle $shouldShowTitle={shouldShowTitleOnToolBar}>
          <div>{selectedNote?.title}</div>
        </NoteTitle>
        <ActionBtns>
          <div
            onClick={() => setShouldShowEditorMenuBar(!shouldShowEditorMenuBar)}
          >
            <GoBold size={18} strokeWidth={0.5} />
            <FiItalic size={17} />
            <RxUnderline size={19} strokeWidth={0.1} />
          </div>
          <div>
            <IoInformationCircleOutline size={23} />
          </div>
          <DeleteBtn>
            <AiOutlineDelete size={21} onClick={handleDeleteNote} />
          </DeleteBtn>
          <div>
            <PiDotsThreeVerticalBold size={21} strokeWidth={6} />
          </div>
        </ActionBtns>
      </ToolBarContent>
    </NoteToolBarWrapper>
  );
}

export default NoteToolBar;
