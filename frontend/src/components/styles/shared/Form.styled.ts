import styled from "styled-components";

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
  }

  /* div {
    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  } */

  button {
    margin: auto;
    margin-bottom: 25px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ValidationError = styled.p`
  text-align: right;
  color: red;
  font-size: 1rem;

  @media (min-width: 640px) {
    font-size: 1.15rem;
    line-height: 1.75rem;
  }
`;

export const SwitchFormText = styled.p`
  margin-top: 10px;

  text-align: center;

  span {
    text-decoration: underline;
  }
  span:hover {
    cursor: pointer;
  }
`;
