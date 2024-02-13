import { API_URL } from "../constants";
import { Response } from "../models/responses";
import { User } from "../models/user";

export class LoginRepository {
  static async login(data: {
    user: string;
    password: string;
  }): Promise<Response<User>> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
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
