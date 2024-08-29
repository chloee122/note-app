import styled from "styled-components";

const FormWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  min-height: min(50vh, 450px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  h2 {
    text-align: center;
    margin-top: 25px;
  }
`;

export default FormWrapper;
