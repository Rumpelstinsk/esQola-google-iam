import { API_URL } from "../constants";

export class LoginRepository {
  static async login(data: { user: string; password: string }) {
    try {
      return await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      return { error: "He petado" };
    }
  }
}
