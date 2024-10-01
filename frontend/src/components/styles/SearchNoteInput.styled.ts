import styled, { keyframes } from "styled-components";

const expandFromRightToLeft = keyframes`
  0% {
   width: 40%;
  }
  100% {
    width: 100%;
  }
`;

export const SearchNoteInputWrapper = styled.div<{ $shouldFocus: boolean }>`
  border: ${(props) =>
    props.$shouldFocus ? "#8daac9 1px solid" : "#cbcbcb 1px solid"};
  border-radius: 6px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: ${(props) => (props.$shouldFocus ? "3px solid #a8c6e5" : "none")};
  animation: 0.25s ${expandFromRightToLeft} ease forwards;
  overflow: hidden;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    background-color: #f9f9f9;
  }
`;

export const SearchNoteInputIcon = styled.div`
  padding: 0 5px;
  color: #525351;
  display: flex;
  align-items: center;
  justify-content: center;
`;
