import styled from "styled-components";

export const MainPageWrapper = styled.div`
  background-color: #f3f0ff;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  margin: 10px 40px;

  p {
    font-weight: bold;
  }
`;

export const NoteView = styled.div`
  max-width: 65%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 25px;
  margin: 30px auto;
`;
