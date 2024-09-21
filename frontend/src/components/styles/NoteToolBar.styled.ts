import styled from "styled-components";

export const NoteToolBarWrapper = styled.div<{ $borderEffect?: boolean }>`
  padding: 10px 10px 10px 20px;
  border-bottom: ${(props) =>
    props.$borderEffect ? "0.5px solid #dcdcdc" : "none"};
  box-shadow: ${(props) =>
    props.$borderEffect ? "#e9e9e9 0px 1px 1px 0px" : "none"};
  z-index: 10;
  display: flex;
  justify-content: space-between;
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

export const NoteTitle = styled.div`
  display: flex;
  place-items: center;
  position: relative;
  top: 1px;

  div {
    width: 560px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
  }
`;
