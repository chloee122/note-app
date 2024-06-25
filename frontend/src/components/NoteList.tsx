import { Note } from "../common/internal";
import NoteDetails from "./NoteDetails";
import { NoteListWrapper, List } from "./styles/NoteList.styled";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const listOfNotes = notes.map((note) => (
    <NoteDetails key={note.id} note={note} />
  ));

  return (
    <NoteListWrapper>
      <List>{listOfNotes}</List>
    </NoteListWrapper>
  );
}

export default NoteList;
