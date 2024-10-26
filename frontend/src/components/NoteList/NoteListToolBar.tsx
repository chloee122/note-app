import { RiArrowDownSLine } from "react-icons/ri";
import { PiNotePencilLight } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import {
  IconBtn,
  NoteOptionsDropdown,
  SearchNoteInputContainer,
} from "../styles/NoteListToolBar.styled";
import {
  ActionBtns,
  ToolBarContent,
  ToolBarWrapper,
} from "../styles/shared/ToolBar.styled";
import { useState } from "react";
import SearchNoteInput from "./SearchNoteInput";
import useAppContext from "../../hooks/useAppContext";

interface NoteListToolBarProps {
  noteListScrolled: boolean;
}

function NoteListToolBar({ noteListScrolled }: NoteListToolBarProps) {
  const [shouldShowSearchNoteInput, setShouldShowSearchNoteInput] =
    useState(false);

  const { addNote } = useAppContext();

  const handleAddNote = () => {
    const initialNote = {
      title: "Untitled",
      htmlContent: "",
      plainTextContent: "",
    };
    addNote(initialNote);
  };

  return (
    <ToolBarWrapper $borderEffect={noteListScrolled}>
      <ToolBarContent>
        {shouldShowSearchNoteInput && (
          <SearchNoteInputContainer>
            <SearchNoteInput
              setShouldShowSearchNoteInput={setShouldShowSearchNoteInput}
            />
          </SearchNoteInputContainer>
        )}
        <NoteOptionsDropdown $shrinkEffect={shouldShowSearchNoteInput}>
          Notes
          <RiArrowDownSLine size={14} strokeWidth={1} color="#909191" />
        </NoteOptionsDropdown>
        <ActionBtns>
          <IconBtn
            $shrinkEffect={shouldShowSearchNoteInput}
            onClick={handleAddNote}
          >
            <PiNotePencilLight strokeWidth={4} size={23} />
          </IconBtn>
          <IconBtn
            $shrinkEffect={shouldShowSearchNoteInput}
            onClick={() => setShouldShowSearchNoteInput(true)}
          >
            <GoSearch strokeWidth={0.3} size={21} />
          </IconBtn>
        </ActionBtns>
      </ToolBarContent>
    </ToolBarWrapper>
  );
}

export default NoteListToolBar;
