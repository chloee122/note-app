import { RiArrowDownSLine } from "react-icons/ri";
import { PiNotePencilLight } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { NoteOptionsDropdown } from "../styles/NoteListToolBar.styled";
import { ActionBtns, ToolBarWrapper } from "../styles/shared/ToolBar.styled";

interface NoteListToolBarProps {
  noteListScrolled: boolean;
}

function NoteListToolBar({ noteListScrolled }: NoteListToolBarProps) {
  return (
    <ToolBarWrapper $borderEffect={noteListScrolled}>
      <NoteOptionsDropdown>
        Notes
        <RiArrowDownSLine size={14} strokeWidth={1} color="#909191" />
      </NoteOptionsDropdown>
      <ActionBtns>
        <div>
          <PiNotePencilLight strokeWidth={4} size={23} />
        </div>
        <div>
          <GoSearch strokeWidth={0.3} size={21} />
        </div>
      </ActionBtns>
    </ToolBarWrapper>
  );
}

export default NoteListToolBar;
