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
  return (
    <NoteItemWrapper className="note">
      <NoteItemContent>
        <NoteItemHeader>A wonderful new note</NoteItemHeader>
        <NoteItemText>{note.plainTextContent}</NoteItemText>
        <span>Just now</span>
      </NoteItemContent>
    </NoteItemWrapper>
  );
}

export default NoteItem;
