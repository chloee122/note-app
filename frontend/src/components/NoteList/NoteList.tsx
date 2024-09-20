import type { Note } from "../../common/internal";
import NoteItem from "./NoteItem";
import NotesToolBar from "../NotesToolBar";
import { NoteListWrapper, ListWrapper } from "../styles/NoteList.styled";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const listOfNotes = notes.map((note) => (
    <NoteItem key={note.id} note={note} />
  ));

  return (
    <NoteListWrapper>
      <NotesToolBar />
      <ListWrapper>{listOfNotes}</ListWrapper>
    </NoteListWrapper>
  );
}

export default NoteList;
