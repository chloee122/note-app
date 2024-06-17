import useAppContext from "../hooks/useAppContext";
import type { Note } from "../common/internal";

interface NoteDetailsProps {
  note: Note;
}

function NoteDetails({ note }: NoteDetailsProps) {
  const { toggleImportance } = useAppContext();

  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  );
}

export default NoteDetails;
