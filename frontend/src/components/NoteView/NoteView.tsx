import { useEffect, useState } from "react";
import NoteContainer from "./NoteContainer";
import NoteToolBar from "./NoteToolBar";
import { NoteViewWrapper } from "../styles/NoteView.styled";
import { useParams } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";

function NoteView() {
  useAxiosInterceptors();

  const [noteScrolled, setNoteScrolled] = useState(false);
  const [shouldShowTitleOnToolBar, setShouldShowTitleOnToolBar] =
    useState(false);
  const [shouldShowEditorMenuBar, setShouldShowEditorMenuBar] = useState(false);

  const { noteId } = useParams();
  const { getNote, selectedNote } = useAppContext();

  useEffect(() => {
    if (noteId) getNote(noteId);
  }, [noteId]);

  return (
    <NoteViewWrapper>
      <NoteToolBar
        noteScrolled={noteScrolled}
        shouldShowTitleOnToolBar={shouldShowTitleOnToolBar}
        setShouldShowEditorMenuBar={setShouldShowEditorMenuBar}
        shouldShowEditorMenuBar={shouldShowEditorMenuBar}
      />
      {selectedNote && (
        <NoteContainer
          setNoteScrolled={setNoteScrolled}
          setShouldShowTitleOnToolBar={setShouldShowTitleOnToolBar}
          shouldShowEditorMenuBar={shouldShowEditorMenuBar}
          selectedNote={selectedNote}
        />
      )}
    </NoteViewWrapper>
  );
}

export default NoteView;
