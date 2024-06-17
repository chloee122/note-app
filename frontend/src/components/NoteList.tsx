import { Note } from "../common/internal";
import NoteDetails from "./NoteDetails";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const listOfNotes = notes.map((note) => (
    <NoteDetails key={note.id} note={note} />
  ));

  return <ul>{listOfNotes}</ul>;
}

export default NoteList;
