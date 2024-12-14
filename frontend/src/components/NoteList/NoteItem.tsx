import { useNavigate, useParams } from "react-router-dom";
import type { Note } from "../../common/internal";
import {
  NoteItemContent,
  NoteItemHeader,
  NoteItemText,
  NoteItemWrapper,
} from "../styles/NoteItem.styled";

interface NoteDetailsProps {
  note: Note;
}

function NoteItem({ note }: NoteDetailsProps) {
  const navigate = useNavigate();

  const { noteId } = useParams();

  return (
    <NoteItemWrapper
      className="note"
      onClick={() => navigate(`/notes/${note.id}`)}
      $highlight={note.id === noteId}
    >
      <NoteItemContent>
        <NoteItemHeader>{note.title}</NoteItemHeader>
        <NoteItemText>{note.plainTextContent}</NoteItemText>
        <span>Just now</span>
      </NoteItemContent>
    </NoteItemWrapper>
  );
}

export default NoteItem;
