import { useCallback } from "react";

import { Response } from "../models/responses";
import { SecuredRepository } from "../repositories";
import { SecuredMessage } from "../models/secured-message";

export const useSenders = () => {
  const sendSecured = useCallback(async (): Promise<
    Response<SecuredMessage>
  > => {
    return SecuredRepository.send();
  }, []);

  return { sendSecured };
};
