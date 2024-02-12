import { useUser } from "../contexts/UserContext";
import { LoginForm } from "./LoginForm";
import { SignoutForm } from "./SignoutForm";

export const Login = () => {
  const { user } = useUser();

  return user ? <SignoutForm /> : <LoginForm />;
};
