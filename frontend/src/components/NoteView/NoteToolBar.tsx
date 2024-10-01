import { GoBold } from "react-icons/go";
import { FiItalic } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxUnderline } from "react-icons/rx";
import { NoteTitle } from "../styles/NoteToolBar.styled";
import {
  ActionBtns,
  NoteToolBarWrapper,
  ToolBarContent,
} from "../styles/shared/ToolBar.styled";

interface NoteToolBarProps {
  noteScrolled: boolean;
  shouldShowTitleOnToolBar: boolean;
}

function NoteToolBar({
  noteScrolled,
  shouldShowTitleOnToolBar,
}: NoteToolBarProps) {
  return (
    <NoteToolBarWrapper $borderEffect={noteScrolled}>
      <ToolBarContent>
        <NoteTitle $shouldShowTitle={shouldShowTitleOnToolBar}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
            sapien at diam laoreet sollicitudin.
          </div>
        </NoteTitle>
        <ActionBtns>
          <div>
            <GoBold size={18} strokeWidth={0.5} />
            <FiItalic size={17} />
            <RxUnderline size={19} strokeWidth={0.1} />
          </div>
          <div>
            <IoInformationCircleOutline size={23} />
          </div>
          <div>
            <PiDotsThreeVerticalBold size={21} strokeWidth={6} />
          </div>
        </ActionBtns>
      </ToolBarContent>
    </NoteToolBarWrapper>
  );
}

export default NoteToolBar;
