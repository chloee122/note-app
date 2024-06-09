import { useAppContext } from "../context/AppContext";

export default function Note({ note }) {
  const { toggleImportance } = useAppContext();

  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  );
}
