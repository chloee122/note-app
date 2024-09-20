import styled from "styled-components";

export const NotesToolBarWrapper = styled.div<{ $borderEffect?: boolean }>`
  padding: 10px;
  border-bottom: ${(props) =>
    props.$borderEffect ? "0.5px solid #dcdcdc" : "none"};
  box-shadow: ${(props) =>
    props.$borderEffect ? "#e9e9e9 0px 1px 1px 0px" : "none"};
  z-index: 10;
  display: flex;
  justify-content: space-between;
`;

export const NoteOptionsDropdown = styled.div`
  display: flex;
  place-items: center;
  gap: 2px;
  color: #222222;
  font-weight: 600;
`;

export const NoteActionBtns = styled.div`
  display: flex;
  align-items: center;
  color: #909191;
  gap: 4px;

  div {
    padding: 4px 7px;
    display: flex;

    &:hover {
      background-color: #eff1f2;
      border-radius: 5px;
    }
  }
`;
