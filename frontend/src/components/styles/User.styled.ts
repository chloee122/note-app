import styled from "styled-components";

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  margin: 10px 40px;

  p {
    font-weight: bold;
  }

  .button {
    background-color: #ff8787;
    border: none;
    min-width: 100px;
    padding: 10px;
    color: white;
    font-weight: bold;
    font-size: inherit;
    border-radius: 8px;
  }
`;

export default User;
