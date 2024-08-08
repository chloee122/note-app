import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import Input from "../styles/shared/Input.styled";
import Button from "../styles/shared/Button.styled";
import Form from "../styles/shared/Form.styled";
import FormWrapper from "../styles/shared/FormWrapper.styled";

interface LoginFormProps {
  switchForm: () => void;
}

function LoginForm({ switchForm }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <FormWrapper>
      <h2>Log in to your account</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Username</label>
            <Input
              data-testid="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          {/* for rendering validation error */}
          {/* <span></span> */}
        </div>
        <div>
          <div>
            <label>Password</label>
            <Input
              data-testid="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          {/* <span></span> */}
        </div>
        <p>
          Not registered?{" "}
          <span onClick={() => switchForm()}>Sign up here</span>
        </p>
        <Button $width={100} $noBorder={true} $color={"white"} type="submit">
          Log In
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;
