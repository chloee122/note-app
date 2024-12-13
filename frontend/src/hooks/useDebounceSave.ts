import { useEffect, useState } from "react";
import { Note } from "../common/internal";
import useAppContext from "./useAppContext";

const DEBOUNCE_DELAY = 500;

const useDebounceSave = (note: Note) => {
  const { editNote } = useAppContext();

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      editNote(note.id, {
        title: note.title,
        htmlContent: note.htmlContent,
        plainTextContent: note.plainTextContent,
      });
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [note]);
};

export default useDebounceSave;
