import styled from "styled-components";

const User = styled.div`
  /* border: blue solid 2px; */
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  margin: 10px 20px;

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  button {
    background-color: #ff8787;
    border: none;
    min-width: 100px;
    padding: 10px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 8px;
  }
`;

export default User;
