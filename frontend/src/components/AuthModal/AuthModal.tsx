import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Navigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import Modal from "./Modal";

enum AuthMode {
  LOGIN = "login",
  SIGNUP = "signup",
}

interface AuthModalProps {
  closeModal: () => void;
}

function AuthModal({ closeModal }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);
  const { user } = useAppContext();

  if (user) {
    return <Navigate to="/notes" />;
  }

  const switchForm = (formType: AuthMode) => {
    setAuthMode(formType);
  };

  return (
    <Modal closeModal={closeModal}>
      {authMode === AuthMode.SIGNUP ? (
        <SignUpForm switchForm={() => switchForm(AuthMode.LOGIN)} />
      ) : (
        <LoginForm switchForm={() => switchForm(AuthMode.SIGNUP)} />
      )}
    </Modal>
  );
}

export default AuthModal;
