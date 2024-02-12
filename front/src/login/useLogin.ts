import { useCallback } from "react";
import { LoginRepository, Response } from "../repositories";
import { User } from "../models/user";

export const useLogin = () => {
  const login = useCallback(
    async (data: {
      user: string;
      password: string;
    }): Promise<Response<User>> => {
      return LoginRepository.login(data);
    },
    []
  );

  return { login };
};
