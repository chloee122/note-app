import { useAppContext } from "../context/AppContext";
import type { Note } from "../common/internal";

interface NoteProps {
  note: Note;
}

export default function Note({ note }: NoteProps) {
  const { toggleImportance } = useAppContext();

  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  );
}
