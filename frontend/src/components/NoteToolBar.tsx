import { GoBold } from "react-icons/go";
import { FiItalic } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxUnderline } from "react-icons/rx";
import {
  NoteActionBtns,
  NoteTitle,
  NoteToolBarWrapper,
} from "./styles/NoteToolBar.styled";

interface NoteToolBarProps {
  noteScrolled: boolean;
  showTitleOnToolBar: boolean;
}

function NoteToolBar({ noteScrolled, showTitleOnToolBar }: NoteToolBarProps) {
  return (
    <NoteToolBarWrapper $borderEffect={noteScrolled}>
      <NoteTitle>
        {showTitleOnToolBar && (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
            sapien at diam laoreet sollicitudin.
          </div>
        )}
      </NoteTitle>
      <NoteActionBtns>
        <div>
          <GoBold size={18} strokeWidth={0.5} />
          <FiItalic size={17} />
          <RxUnderline size={19} strokeWidth={0.1} />
        </div>
        <div>
          <IoInformationCircleOutline size={24} />
        </div>
        <div>
          <PiDotsThreeVerticalBold size={21} strokeWidth={5} />
        </div>
      </NoteActionBtns>
    </NoteToolBarWrapper>
  );
}

export default NoteToolBar;
