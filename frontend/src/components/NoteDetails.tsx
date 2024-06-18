import useAppContext from "../hooks/useAppContext";
import type { Note } from "../common/internal";
import NoteItem from "./styles/NoteDetails.styled";

interface NoteDetailsProps {
  note: Note;
}

function NoteDetails({ note }: NoteDetailsProps) {
  const { toggleImportance } = useAppContext();

  const label = note.important ? "make not important" : "make important";

  return (
    <NoteItem className="note" $important={note.important}>
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </NoteItem>
  );
}

export default NoteDetails;
