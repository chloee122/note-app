import { RiArrowDownSLine } from "react-icons/ri";
import { PiNotePencilLight } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import {
  NotesToolBarWrapper,
  NoteActionBtns,
  NoteOptionsDropdown,
} from "./styles/NotesToolBar.styled";

interface NotesToolBarProps {
  noteListScrolled: boolean;
}

function NotesToolBar({ noteListScrolled }: NotesToolBarProps) {
  return (
    <NotesToolBarWrapper $borderEffect={noteListScrolled}>
      <NoteOptionsDropdown>
        Notes
        <RiArrowDownSLine size={14} strokeWidth={1} color="#909191" />
      </NoteOptionsDropdown>
      <NoteActionBtns>
        <div>
          <PiNotePencilLight strokeWidth={4} size={23} />
        </div>
        <div>
          <GoSearch strokeWidth={0.3} size={21} />
        </div>
      </NoteActionBtns>
    </NotesToolBarWrapper>
  );
}

export default NotesToolBar;
