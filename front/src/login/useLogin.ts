import { useCallback } from "react";
import { LoginRepository } from "../repositories";
import { User } from "../models/user";
import { Response } from "../models/responses";

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
