import styled from "styled-components";

export const NoteListWrapper = styled.div`
  background-color: #f9f9f9;
  width: 221px;
  border-right: 1px solid #bfbfbf;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 370px;
  }
`;

export const ListWrapper = styled.div`
  flex: 1 1 0%;
  overflow-y: scroll;
  scrollbar-color: #aaaaaa #f9f9f9;
`;
