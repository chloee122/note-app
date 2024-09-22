import { useState } from "react";
import Note from "./Note";
import NoteToolBar from "./NoteToolBar";
import { NoteViewWrapper } from "../styles/NoteView.styled";

function NoteView() {
  const [noteScrolled, setNoteScrolled] = useState(false);
  const [showTitleOnToolBar, setShowTitleOnToolBar] = useState(false);

  return (
    <NoteViewWrapper>
      <NoteToolBar
        noteScrolled={noteScrolled}
        showTitleOnToolBar={showTitleOnToolBar}
      />
      <Note
        setNoteScrolled={setNoteScrolled}
        setShowTitleOnToolBar={setShowTitleOnToolBar}
      />
    </NoteViewWrapper>
  );
}

export default NoteView;
