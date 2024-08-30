import { ReactNode, useEffect } from "react";
import { ModalBackground, ModalContentContainer } from "../styles/Modal.styled";

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

function Modal({ children, closeModal }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <ModalBackground onClick={closeModal}></ModalBackground>
      <ModalContentContainer>{children}</ModalContentContainer>
    </>
  );
}

export default Modal;
