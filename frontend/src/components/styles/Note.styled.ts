import styled from "styled-components";

export const NoteWrapper = styled.div`
  flex: 1 1 0%;
  overflow-y: scroll;
  scrollbar-color: #aaaaaa #f9f9f9;
`;

export const NoteContent = styled.div`
  box-sizing: border-box;
  padding: 5px 55px 100px 55px;
  max-width: 620px;
  margin: auto;
`;

export const NoteTitle = styled.div`
  font-size: 28px;
  font-weight: 900;
  line-height: 1.5;
  margin-bottom: 7px;
`;

export const NoteBody = styled.div`
  font-size: 15px;
  line-height: 1.8;
`;
