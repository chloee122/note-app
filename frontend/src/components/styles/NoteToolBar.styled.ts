import styled from "styled-components";

export const NoteTitle = styled.div<{ $shouldShowTitle?: boolean }>`
  display: flex;
  place-items: center;
  position: relative;
  top: 1px;
  overflow: hidden;

  div {
    padding-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    opacity: ${(props) => (props.$shouldShowTitle ? 1 : 0)};
    transition: opacity 0.2s ease-in;
  }
`;
