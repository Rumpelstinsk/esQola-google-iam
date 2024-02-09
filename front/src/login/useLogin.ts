import { useCallback } from "react";
import { LoginRepository } from "../repositories";

export const useLogin = () => {
  const login = useCallback(
    async (data: { user: string; password: string }) => {
      return LoginRepository.login(data);
    },
    []
  );

  return { login };
};
