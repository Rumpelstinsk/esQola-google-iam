import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { User } from "../models/user";

interface IUserContext {
  user: User | null;
}

const UserContext = createContext<
  [IUserContext, Dispatch<SetStateAction<IUserContext>>] | null
>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userState = useState<IUserContext>({ user: null });

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUser should be wrapped inside a UserProvider");
  }

  const [context, setContext] = userContext;

  const login = useCallback(
    (user: User) => {
      setContext({ user });
    },
    [setContext]
  );

  const logout = useCallback(() => {
    setContext({ user: null });
  }, [setContext]);

  return {
    user: context.user,
    login,
    logout,
  };
};
