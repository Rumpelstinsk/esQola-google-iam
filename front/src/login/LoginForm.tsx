import { useState } from "react";
import { useLogin } from "./useLogin";

import { isErrorResponse } from "../repositories";
import { useUser } from "../contexts/UserContext";

export const LoginForm = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();
  const { login: setLoggedUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "user") setUser(e.target.value);
    else setPassword(e.target.value);

    setError("");
  };

  const handleLoginClick = async () => {
    const response = await login({ user, password });
    if (isErrorResponse(response)) {
      setError(response.error);
      return;
    }

    setLoggedUser(response);
  };

  return (
    <div>
      <div>
        <p>Usuario</p>
        <input name="user" value={user} onChange={handleChange} />
      </div>
      <div>
        <p>Contraseña</p>
        <input name="password" value={password} onChange={handleChange} />
      </div>
      <div>
        <button disabled={!user || !password} onClick={handleLoginClick}>
          LogIn
        </button>
      </div>
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};
