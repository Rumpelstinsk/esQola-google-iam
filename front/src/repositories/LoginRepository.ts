import { API_URL } from "../constants";

interface Error {
  error: string;
}

type Success<T> = T & {
  error?: never;
};

export type Response<T> = Error | Success<T>;

export const isErrorResponse = (response: Response<any>): response is Error =>
  "error" in response;

export class LoginRepository {
  static async login<T>(data: {
    user: string;
    password: string;
  }): Promise<Response<T>> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      return response.ok
        ? responseData
        : { error: responseData.detail ?? "Unknown error" };
    } catch {
      return { error: "Unknown exception" };
    }
  }
}
