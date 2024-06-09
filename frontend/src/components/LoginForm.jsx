import { Navigate } from "react-router-dom";

function LoginForm({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  user,
}) {
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
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
