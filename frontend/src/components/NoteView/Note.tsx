import { useEffect, useRef, useState } from "react";
import {
  NoteBody,
  NoteContent,
  NoteTitle,
  NoteWrapper,
} from "../styles/Note.styled";
import NoteEditor from "./NoteEditor";

interface NoteProps {
  setNoteScrolled: (arg: boolean) => void;
  setShouldShowTitleOnToolBar: (arg: boolean) => void;
  shouldShowEditorMenuBar: boolean;
}

function Note({
  setNoteScrolled,
  setShouldShowTitleOnToolBar,
  shouldShowEditorMenuBar,
}: NoteProps) {
  const [title, setTitle] = useState("Untitled");

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
  }, [title]);

  return (
    <NoteWrapper ref={noteRef} onScroll={handleScroll}>
      <NoteContent>
        <NoteTitle ref={noteHeadingRef}>
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (!title.trim()) {
                setTitle("Untitled");
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
          <NoteEditor shouldShowEditorMenuBar={shouldShowEditorMenuBar} />
        </NoteBody>
      </NoteContent>
    </NoteWrapper>
  );
}

export default Note;
