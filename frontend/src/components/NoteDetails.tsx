import useAppContext from "../hooks/useAppContext";
import type { Note } from "../common/internal";
import { NoteItem } from "./styles/NoteDetails.styled";
import { IoCloseSharp } from "react-icons/io5";

interface NoteDetailsProps {
  note: Note;
}

function NoteDetails({ note }: NoteDetailsProps) {
  const { toggleImportance } = useAppContext();

  const label = note.important ? "Make not important" : "Make important";

  return (
    <NoteItem className="note" $important={note.important}>
      <div>
        <span>{note.content}</span>
      </div>
      <div className="btns">
        <button className="delete">
          <IoCloseSharp />
        </button>
        <button onClick={() => toggleImportance(note.id)}>{label}</button>
      </div>
    </NoteItem>
  );
}

export default NoteDetails;
