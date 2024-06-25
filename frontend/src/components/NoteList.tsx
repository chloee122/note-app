import { Note } from "../common/internal";
import NoteDetails from "./NoteDetails";
import List from "./styles/NoteList.styled";
import ListContainer from "./styles/ListContainer.styled";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const listOfNotes = notes.map((note) => (
    <NoteDetails key={note.id} note={note} />
  ));

  return (
    <ListContainer>
      <List>{listOfNotes}</List>
    </ListContainer>
  );
}

export default NoteList;
