import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import LoginFormContainer from "./styles/LoginFormContainer";
import Form from "./styles/Form.styled";
import Input from "./styles/Input.styled";
import Button from "./styles/Button.styled";
import StyledLoginForm from "./styles/LoginForm.styled";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
    navigate("/notes");
    setUsername("");
    setPassword("");
  };

  if (user) {
    return <Navigate to="/notes" />;
  }

  return (
    <StyledLoginForm>
      <h2>&quot;The Palest Ink Is Better Than the Best Memory.&quot;</h2>
      <LoginFormContainer>
        <h2>Log in to your account</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <Input
              data-testid="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              data-testid="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button $width={100} $noBorder={true} $color={"white"} type="submit">
            Login
          </Button>
        </Form>
      </LoginFormContainer>
    </StyledLoginForm>
  );
}

export default LoginForm;
