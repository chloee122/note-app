import styled from "styled-components";

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  div {
    width: 100%;
    
    div {
      display: grid;
      grid-template-columns: 30% 70%;
      align-items: center;
      text-align: center;
    }

    span {
      display: block;
      text-align: right;
      width: 80%;
      margin-left: auto;
      color: red;
      font-size: 15px;
    }
  }

  p {
    margin-top: 10px;

    span {
      text-decoration: underline;
    }
    span:hover {
      cursor: pointer;
    }
  }

  input {
    margin: 0;
  }

  button {
    margin-bottom: 25px;
  }
`;

export default Form;
