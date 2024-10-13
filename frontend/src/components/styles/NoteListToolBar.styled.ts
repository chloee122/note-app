import styled from "styled-components";

export const NoteOptionsDropdown = styled.div<{ $shrinkEffect: boolean }>`
  display: flex;
  place-items: center;
  gap: 2px;
  color: #222222;
  font-weight: 600;
  transform: ${(props) => (props.$shrinkEffect ? "scale(0.5)" : "scale(1)")};
  transform-origin: left;
  opacity: ${(props) => (props.$shrinkEffect ? "0" : "1")};
  transition: transform 0.3s ease, opacity 0.3s;
`;

export const SearchNoteInputContainer = styled.div`
  display: flex;
  justify-content: right;
  position: absolute;
  padding: 0 10px;
  width: 100%;
  left: 0;
`;

export const IconBtn = styled.div<{ $shrinkEffect: boolean }>`
  transform: ${(props) => (props.$shrinkEffect ? "scale(0)" : "scale(1)")};
  opacity: ${(props) => (props.$shrinkEffect ? "0" : "1")};
  transition: transform 0.2s ease;
`;
