import styled from "styled-components";

const NoteItem = styled.li<{ $important?: boolean }>`
  border: 1.5px solid black;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  padding: 20px;
  border-radius: 25px;
  margin: 0px 20px 15px 0px;
  font-size: 1.2rem;
  background-color: ${(props) => (props.$important ? "#ff8787" : "#ffc9c9")};

  span {
    width: 80%;
  }

  button {
    background-color: ${(props) => (props.$important ? "#ff8787" : "#ffc9c9")};
    /* border: none; */
    /* min-width: 100px; */
    padding: 5px 8px;
    color: black;
    /* font-weight: bold; */
    /* font-size: 14px; */
    border-radius: 8px;
    /* border: solid black 1.2px; */
  }
`;

export default NoteItem;
