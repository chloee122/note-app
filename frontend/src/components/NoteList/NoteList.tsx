import { useState, useRef } from "react";
import type { Note } from "../../common/internal";
import NoteItem from "./NoteItem";
import NotesToolBar from "../NotesToolBar";
import { NoteListWrapper, ListWrapper } from "../styles/NoteList.styled";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const [noteListScrolled, setNoteListScrolled] = useState(false);
  const noteListRef = useRef<HTMLDivElement>(null);

  const listOfNotes = notes.map((note) => (
    <NoteItem key={note.id} note={note} />
  ));

  const handleScroll = () => {
    const currentScroll = noteListRef.current?.scrollTop || 0;
    setNoteListScrolled(currentScroll > 0);
  };

  return (
    <NoteListWrapper>
      <NotesToolBar noteListScrolled={noteListScrolled} />
      <ListWrapper ref={noteListRef} onScroll={handleScroll}>
        {listOfNotes}
      </ListWrapper>
    </NoteListWrapper>
  );
}

export default NoteList;
