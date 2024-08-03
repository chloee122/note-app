import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { AuthFormWrapper } from "../styles/AuthForm.styled";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Navigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

export enum AuthMode {
  LOGIN = "login",
  SIGNUP = "signup",
}

function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);
  const { user } = useAppContext();

  if (user) {
    return <Navigate to="/notes" />;
  }

  const switchForm = (formType: AuthMode) => {
    setAuthMode(formType);
  };

  return (
    <AuthFormWrapper>
      <h1>&quot;The Palest Ink Is Better Than The Best Memory.&quot;</h1>
      {authMode === AuthMode.SIGNUP ? (
        <SignUpForm switchForm={switchForm} />
      ) : (
        <LoginForm switchForm={switchForm} />
      )}
    </AuthFormWrapper>
  );
}

export default AuthPage;
