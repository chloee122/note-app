import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { SearchNoteInputWrapper } from "../styles/SearchNoteInput.styled";
import { SearchNoteInputIcon } from "../styles/SearchNoteInput.styled";

interface SearchNoteInputProps {
  setShouldShowSearchNoteInput: (arg: boolean) => void;
}

function SearchNoteInput({
  setShouldShowSearchNoteInput,
}: SearchNoteInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const [shouldFocus, setShouldFocus] = useState(false);

  return (
    <SearchNoteInputWrapper $shouldFocus={shouldFocus}>
      <SearchNoteInputIcon>
        <CgSearch />
      </SearchNoteInputIcon>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search"
        onFocus={() => setShouldFocus(true)}
        onBlur={() => setShouldFocus(false)}
        autoFocus
      ></input>
      <SearchNoteInputIcon
        onClick={() => {
          setShouldShowSearchNoteInput(false);
        }}
      >
        <MdCancel size={17} />
      </SearchNoteInputIcon>
    </SearchNoteInputWrapper>
  );
}

export default SearchNoteInput;
