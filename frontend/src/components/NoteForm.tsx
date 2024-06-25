import { useState } from "react";
import useAppContext from "../hooks/useAppContext";
import NoteFormContainer from "./styles/NoteFormContainer.styled";
import Input from "./styles/Input.styled";
import Button from "./styles/Button.styled";

function NoteForm() {
  const [newNote, setNewNote] = useState("");
  const { addNote } = useAppContext();

  const handleAddNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <NoteFormContainer className="formDiv">
      <form onSubmit={handleAddNote}>
        <Input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="Write note content here"
        />
        <Button type="submit">Save</Button>
      </form>
    </NoteFormContainer>
  );
}

export default NoteForm;
