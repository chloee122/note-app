import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
    navigate("/notes");
    setUsername("");
    setPassword("");
  };

  if (user) {
    return <Navigate to="/notes" />;
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
