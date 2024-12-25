import { useEffect, useState } from "react";
import { Note } from "../common/internal";
import useAppContext from "./useAppContext";

const DEBOUNCE_SAVE_NOTE_DELAY = 500;
const DEBOUNCE_FETCH_NOTE_LIST_DELAY = 1500;

const useDebounceSaveNoteAndFetchNoteList = (note: Note) => {
  const { editNote, getNotes } = useAppContext();

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

    const debounceFetchNoteListTimer = setTimeout(() => {
      getNotes();
    }, DEBOUNCE_FETCH_NOTE_LIST_DELAY);

    return () => {
      clearTimeout(debounceSaveNoteTimer);
      clearTimeout(debounceFetchNoteListTimer);
    };
  }, [note]);
};

export default useDebounceSaveNoteAndFetchNoteList;
