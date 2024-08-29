import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  inset: 0px;
  background-color: #00000066;
  backdrop-filter: blur(4px);
  z-index: 60;
`;

export const ModalContentContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  z-index: 60;

  @media (min-width: 640px) {
    width: 60%;
  }

  @media (min-width: 1024px) {
    width: 45%;
  }

  @media (min-width: 1280px) {
    width: 30%;
  }

  @media (min-width: 1536px) {
    width: 25%;
  }
`;
