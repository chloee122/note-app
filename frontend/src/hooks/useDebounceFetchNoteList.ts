import { useEffect, useState } from "react";
import { Note } from "../common/internal";
import useAppContext from "./useAppContext";

const DEBOUNCE_FETCH_NOTE_LIST_DELAY = 1500;

const useDebounceFetchNoteList = (note: Note) => {
  const { getNotes } = useAppContext();

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const debounceFetchNoteListTimer = setTimeout(() => {
      getNotes();
    }, DEBOUNCE_FETCH_NOTE_LIST_DELAY);

    return () => {
      clearTimeout(debounceFetchNoteListTimer);
    };
  }, [note]);
};

export default useDebounceFetchNoteList;
