import styled from "styled-components";

export const NoteItemWrapper = styled.li<{ $important?: boolean }>`
  border: 1.5px solid black;
  list-style: none;
  min-height: 100px;
  padding: 15px 20px;
  border-radius: 25px;
  margin: 0px 20px 15px 0px;
  background-color: ${(props) => (props.$important ? "#ff8787" : "#ffc9c9")};
  display: grid;
  grid-template-columns: 78% 22%;

  button {
    background-color: ${(props) => (props.$important ? "#ff8787" : "#ffc9c9")};
    padding: 5px 8px;
    color: black;
    border-radius: 8px;
    min-width: 80%;
  }

  .btns {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
  }

  .delete {
    border: none;
    padding: 0;
    color: black;
    font-size: 1.2rem;
    min-width: auto;
  }
`;
