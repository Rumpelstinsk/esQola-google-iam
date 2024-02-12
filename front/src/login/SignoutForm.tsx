import { useUser } from "../contexts/UserContext";

export const SignoutForm = () => {
  const { user, logout } = useUser();

  return (
    <>
      <h1>Hola {user?.name}</h1>
      <button type="button" onClick={logout}>
        Salir
      </button>
    </>
  );
};
