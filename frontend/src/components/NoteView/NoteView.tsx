import { useState } from "react";
import Note from "./Note";
import NoteToolBar from "./NoteToolBar";
import { NoteViewWrapper } from "../styles/NoteView.styled";

function NoteView() {
  const [noteScrolled, setNoteScrolled] = useState(false);
  const [shouldShowTitleOnToolBar, setShouldShowTitleOnToolBar] =
    useState(false);

  return (
    <NoteViewWrapper>
      <NoteToolBar
        noteScrolled={noteScrolled}
        shouldShowTitleOnToolBar={shouldShowTitleOnToolBar}
      />
      <Note
        setNoteScrolled={setNoteScrolled}
        setShouldShowTitleOnToolBar={setShouldShowTitleOnToolBar}
      />
    </NoteViewWrapper>
  );
}

export default NoteView;
