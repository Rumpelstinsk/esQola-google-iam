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
import { useCookies } from "react-cookie";
import { TOKEN_COOKIE_NAME } from "../constants";

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
  const [cookie, setCookies, removeCookie] = useCookies();
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
    removeCookie(TOKEN_COOKIE_NAME);
    setContext({ user: null });
  }, [removeCookie, setContext]);

  return {
    user: context.user,
    login,
    logout,
  };
};
