import { useEffect, useRef, useState } from "react";
import {
  NoteBody,
  NoteContent,
  NoteTitle,
  NoteWrapper,
} from "../styles/Note.styled";
import NoteEditor from "./NoteEditor";
import useDebounceSave from "../../hooks/useDebounceSave";
import { Note } from "../../common/internal";

interface NoteProps {
  setNoteScrolled: (arg: boolean) => void;
  setShouldShowTitleOnToolBar: (arg: boolean) => void;
  shouldShowEditorMenuBar: boolean;
  selectedNote: Note;
}

function NoteContainer({
  setNoteScrolled,
  setShouldShowTitleOnToolBar,
  shouldShowEditorMenuBar,
  selectedNote,
}: NoteProps) {
  const [activeNote, setActiveNote] = useState(selectedNote);

  useDebounceSave(activeNote);

  const noteRef = useRef<HTMLDivElement>(null);
  const noteHeadingRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleScroll = () => {
    const scrollPosition = noteRef.current?.scrollTop || 0;
    setNoteScrolled(scrollPosition > 0);

    const noteHeadingHeight = noteHeadingRef.current?.clientHeight || 0;
    setShouldShowTitleOnToolBar(scrollPosition > noteHeadingHeight);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [activeNote.title]);

  return (
    <NoteWrapper ref={noteRef} onScroll={handleScroll}>
      <NoteContent>
        <NoteTitle ref={noteHeadingRef}>
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Untitled"
            value={activeNote.title}
            onChange={(e) => {
              setActiveNote({ ...activeNote, title: e.target.value });
            }}
            onBlur={() => {
              if (!activeNote.title.trim()) {
                setActiveNote({ ...activeNote, title: "Untitled" });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          ></textarea>
        </NoteTitle>
        <NoteBody>
          <NoteEditor
            shouldShowEditorMenuBar={shouldShowEditorMenuBar}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        </NoteBody>
      </NoteContent>
    </NoteWrapper>
  );
}

export default NoteContainer;
