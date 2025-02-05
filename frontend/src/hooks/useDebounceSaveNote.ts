import { useEffect, useState } from "react";
import { Note } from "../common/internal";
import useAppContext from "./useAppContext";

const DEBOUNCE_SAVE_NOTE_DELAY = 500;

const useDebounceSaveNote = (note: Note) => {
  const { editNote } = useAppContext();

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const debounceSaveNoteTimer = setTimeout(() => {
      editNote(note.id, {
        title: note.title,
        htmlContent: note.htmlContent,
        plainTextContent: note.plainTextContent,
      });
    }, DEBOUNCE_SAVE_NOTE_DELAY);

    return () => {
      clearTimeout(debounceSaveNoteTimer);
    };
  }, [note]);
};

export default useDebounceSaveNote;
