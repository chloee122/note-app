import styled from "styled-components";

const NoteFormContainer = styled.div`
  width: 45%;
  background-color: white;
  border: black solid 2px;
  border-radius: 20px;
  margin: auto;

  form {
    display: grid;
    grid-template-columns: 85% 10%;
    align-items: center;
    justify-content: space-evenly;
  }
`;

export default NoteFormContainer;
