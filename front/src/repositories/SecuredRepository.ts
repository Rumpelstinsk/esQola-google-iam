import { API_URL } from "../constants";
import { Response } from "../models/responses";
import { SecuredMessage } from "../models/secured-message";

export class SecuredRepository {
  static async send(): Promise<Response<SecuredMessage>> {
    try {
      const response = await fetch(`${API_URL}/secured`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
