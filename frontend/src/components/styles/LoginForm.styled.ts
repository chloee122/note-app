import styled from "styled-components";

export const LoginFormWrapper = styled.div`
  h2 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 30px;
  }
`;

export const FormWrapper = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  min-height: 50vh;
  width: 30%;
  margin: 30px auto 80px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  label {
    margin-right: 10px;
  }

  button {
    margin-top: 15px;
  }
`;
